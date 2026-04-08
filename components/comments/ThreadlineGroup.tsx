// NOTICE: for a clean version with no code comments look at: ThreadlineGroup_NO_COMMENTS.tsx
import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/* Width reserved for the outermost thread gutter, where the top-level spine is
   drawn. In `CommentThread`, the root `PostComment` row is shifted left by this
   amount (`marginLeft: -selfOffset`) so the gutter can occupy avatar space
   without pushing the visible comment content further right. */
export const THREADLINE_ROOT_COLUMN_WIDTH = 44;

/* Width reserved for nested child gutters. Children already sit indented, so
   they can use a narrower SVG canvas without crowding the content column.
   `CommentThread` uses this width as the child `selfOffset`. */
export const THREADLINE_CHILD_COLUMN_WIDTH = 30;

/* Maximum radius used when bending a vertical line into a horizontal branch.
   This keeps elbows rounded instead of sharp right angles. */
const ELBOW_RADIUS = 30;

/* X coordinate where the root thread spine should be drawn inside the gutter.
   This matches the center of the root avatar size from `PostCommentAvatar`:
   root avatars are 36px wide, so their center sits at x = 18. */
const ROOT_COLUMN_ANCHOR_X = 18;

/* X coordinate where nested child spines should be drawn inside their gutter.
   Child avatars are 22px wide in `PostCommentAvatar`, so x = 11 lines the
   spine up with the avatar center for nested comments. */
const CHILD_COLUMN_ANCHOR_X = 11;

/* Small right-side inset so the branch line stops slightly before the gutter
   edge instead of colliding with the content column. */
const ELBOW_END_GAP = 6;

/* Shared stroke color for every spine and elbow segment in the gutter SVG. */
export const LINE_COLOR = '#48484a';

/* Shared stroke width for every rendered threadline segment. */
export const LINE_WIDTH = 2;

// ─── Types ──────────────────────────────────────────────────────────────────

export type ThreadlineColumnVariant = 'root' | 'child';

export type ThreadlineRowKind = 'self' | 'comment' | 'toggle';

export type ThreadlineRow = {
  /* Stable identifier used both as the React list key and as the lookup key
     for cached row measurements. */
  id: string;

  /* Used by `CommentThread` when it recursively renders child `comment` rows.
     That parent passes this through as `isLastInLevel`, which affects how the
     nested branch builds its own next level of thread lines. */
  isLastSibling: boolean;

  /* Declares which concrete UI row `CommentThread` will render:
     - `self` => the current comment's `PostComment`
     - `comment` => a recursive child `CommentThread`
     - `toggle` => `RepliesToggleRow` */
  kind: ThreadlineRowKind;
};

type RowMeasurements = {
  /* Absolute Y position, inside the group, where the connector should target
     this row. This is the most important coordinate for path generation. */
  anchorY: number;

  /* Measured row height from React Native layout. */
  height: number;

  /* Row's top offset inside the group container. */
  y: number;
};

type ThreadlineGroupProps = {
  /* Optional press target for the gutter itself, useful when the threadline
     area should toggle collapse/expand without pressing the content row. */
  onPressGutter?: () => void;

  /* Consumer-provided renderer for the actual row content. We pass back a
     callback so each row can report a precise connector anchor if needed.
     In this codebase `CommentThread` uses that hook in three real ways:
     - `PostComment` reports the avatar center
     - child `CommentThread` bubbles its own self anchor upward
     - `RepliesToggleRow` reports the button midpoint */
  renderRow: (
    row: ThreadlineRow,
    api: { onAnchorWithinRow: (y: number) => void },
  ) => ReactNode;

  /* Ordered rows that make up this visual threadline group. `CommentThread`
     always builds them in logical reading order:
     self comment first, then visible child comments, then the toggle row. */
  rows: ThreadlineRow[];

  /* Optional test handle for e2e queries. */
  testID?: string;

  /* Chooses root-vs-child gutter geometry. */
  variant: ThreadlineColumnVariant;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export const getThreadlineColumnWidth = (variant: ThreadlineColumnVariant) =>
  variant === 'root' ? THREADLINE_ROOT_COLUMN_WIDTH : THREADLINE_CHILD_COLUMN_WIDTH;

/* The vertical threadline does not sit in the visual center of the gutter.
   Each column variant uses a slightly different x-position so the line aligns
   with the avatar/content spacing used by that depth in the thread UI. */
export const getThreadlineConnectorX = (variant: ThreadlineColumnVariant) =>
  variant === 'root' ? ROOT_COLUMN_ANCHOR_X : CHILD_COLUMN_ANCHOR_X;

function computePaths(input: {
  connectorX: number;
  groupHeight: number;
  gutterWidth: number;
  rowRects: Record<string, RowMeasurements>;
  rows: ThreadlineRow[];
}): { spineD: string | null; elbowsD: string | null } {
  /* Pull everything out of the input object once so the path-building logic
     below reads like geometry code instead of repeated property access. */
  const { connectorX, groupHeight, gutterWidth, rowRects, rows } = input;

  /* Without a measured height there is no reliable SVG viewport, so return
     empty paths and wait for layout to settle. */
  if (groupHeight <= 0) return { spineD: null, elbowsD: null };

  /* `spinePaths` collects the main vertical backbone for this group. */
  const spinePaths: string[] = [];

  /* `elbowPaths` collects every branch segment that turns from the vertical
     spine toward a specific row. These get joined into one SVG `d` string. */
  const elbowPaths: string[] = [];

  /* We can only draw against rows that have reported layout. Rendering may
     briefly happen before every row has measured, so the path builder must be
     resilient to partial data during the first few passes. */
  const measured = rows
    .map((row) => ({ row, m: rowRects[row.id] }))
    .filter((x): x is { row: ThreadlineRow; m: RowMeasurements } => x.m != null);

  if (measured.length === 0) return { spineD: null, elbowsD: null };

  /* Keep every computed coordinate inside the currently measured group. This
     avoids drawing beyond the SVG viewport when rows are still settling or if
     rounding differences produce tiny overshoots. */
  const clamp = (y: number) => Math.max(0, Math.min(groupHeight, y));

  /* Final x-position for branches. We never let the branch end left of the
     spine, and we stop a few pixels short of the gutter edge for breathing room. */
  const horizontalEnd = Math.max(connectorX, gutterWidth - ELBOW_END_GAP);

  /* The first measured row is the current comment's own `PostComment`, so its
     anchor is the avatar center reported from `PostComment.onAvatarLayout`. */
  const first = measured[0];

  /* The last measured row is either:
     - the last visible child thread when replies are expanded, or
     - the `RepliesToggleRow` when collapsed / when the toggle is last. */
  const last = measured[measured.length - 1];

  /* Y where the vertical spine begins. */
  const startY = clamp(first.m.anchorY);

  /* Y of the final row's connector target. */
  const lastY = clamp(last.m.anchorY);

  /* When the last row is a toggle, we may curve the spine into it. The usable
     radius is limited by three things:
     1. the global elbow cap,
     2. how much vertical distance exists from start to end,
     3. how much horizontal runway exists to the right. */
  const radius =
    last.row.kind === 'toggle'
      ? Math.min(
          ELBOW_RADIUS,
          Math.max(0, lastY - startY),
          Math.max(0, horizontalEnd - connectorX),
        )
      : 0;

  /* A trailing `RepliesToggleRow` is special: instead of ending with a hard
     corner, we let the main spine bend into the final horizontal segment so
     the gutter visually reads like "continue into the toggle control". */
  const spineEndY = last.row.kind === 'toggle' ? Math.max(startY, lastY - radius) : lastY;
  const shouldDrawCombinedElbow = last.row.kind === 'toggle' && radius > 0;

  if (shouldDrawCombinedElbow) {
    /* `M x y` moves the SVG pen to the top anchor without drawing.
       `V y2` draws one straight vertical segment down the shared spine.
       This becomes the main backbone of the threadline group. */
    spinePaths.push(`M ${connectorX} ${startY} V ${spineEndY}`);

    /* This path string draws the special combined toggle elbow:
       `M connectorX spineEndY`
         Start exactly where the vertical spine stopped.
       `Q connectorX lastY connectorX + radius lastY`
         Draw a quadratic curve whose control point stays directly below the
         spine, producing a rounded corner into the toggle row.
       `H horizontalEnd`
         Continue horizontally to the right toward the row content. */
    elbowPaths.push(
      `M ${connectorX} ${spineEndY} Q ${connectorX} ${lastY} ${
        connectorX + radius
      } ${lastY} H ${horizontalEnd}`,
    );
  } else {
    /* For normal endings we draw the vertical spine and the terminal elbow as
       separate segments. The tiny distance guard prevents emitting a 0-length
       vertical path, which keeps the resulting SVG output cleaner. */
    if (Math.abs(spineEndY - startY) >= 1) {
      /* Same SVG commands as above, but for the normal non-toggle case:
         move to the first row's anchor, then draw one vertical line down to
         the final row's anchor. */
      spinePaths.push(`M ${connectorX} ${startY} V ${spineEndY}`);
    }

    /* Terminal straight elbow for a normal last row:
       `M connectorX lastY` starts on the spine at the last row's anchor.
       `H horizontalEnd` draws a horizontal branch out toward the content. */
    elbowPaths.push(`M ${connectorX} ${lastY} H ${horizontalEnd}`);
  }

  for (let i = 0; i < measured.length - 1; i++) {
    /* We stop before the last measured row because that row is already handled
       by the terminal logic above. This loop only adds intermediate branches. */
    const { row, m } = measured[i];
    /* The "self" row is the current comment's own `PostComment`. It establishes
       the top anchor for the spine, but we do not draw a separate elbow into it
       because the spine already starts at that row's avatar center. */
    if (row.kind === 'self') continue;

    /* Absolute Y position where this row's branch should meet the spine. */
    const y = clamp(m.anchorY);

    /* Per-row elbow radius uses the same safety rules as the toggle elbow:
       it cannot exceed the global cap, the vertical space available above the
       row, or the horizontal space available to the content edge. */
    const r = Math.min(
      ELBOW_RADIUS,
      Math.max(0, y - startY),
      Math.max(0, horizontalEnd - connectorX),
    );

    /* What gets pushed here is one complete SVG sub-path for this row's branch.
       If `r > 0`, we create a rounded elbow:
       `M connectorX y-r`
         Start slightly above the row's anchor on the vertical spine.
       `Q connectorX y connectorX+r y`
         Curve around the corner so the branch lands smoothly on the row's Y.
       `H horizontalEnd`
         Finish with a horizontal line toward the row content.

       If `r === 0`, there is no room to bend, so we push a simpler path:
       `M connectorX y H horizontalEnd`
         a straight horizontal branch starting exactly at the row anchor. */
    elbowPaths.push(
      r > 0
        ? `M ${connectorX} ${y - r} Q ${connectorX} ${y} ${connectorX + r} ${y} H ${horizontalEnd}`
        : `M ${connectorX} ${y} H ${horizontalEnd}`,
    );
  }

  return {
    /* Join all vertical segments into the single `d` string expected by the
       spine `<Path>`. If nothing was added, return null so React renders nothing. */
    spineD: spinePaths.length ? spinePaths.join(' ') : null,

    /* Same idea for elbows/branches. Multiple sub-paths can live in one SVG
       path string, so we join them with spaces instead of rendering many nodes. */
    elbowsD: elbowPaths.length ? elbowPaths.join(' ') : null,
  };
}

// ─── ContentColumn ──────────────────────────────────────────────────────────

type ContentColumnProps = {
  /* Receives a row-local anchor from children and converts it into group-level
     geometry in the parent component. In practice this is called from
     `PostComment`, nested `CommentThread`, or `RepliesToggleRow`. */
  onAnchorWithinRow: (rowId: string, y: number) => void;

  /* Reports the total content-column height so the SVG gutter can match it. */
  onGroupLayout: (e: LayoutChangeEvent) => void;

  /* Reports each row wrapper's position and height. */
  onRowLayout: (rowId: string, e: LayoutChangeEvent) => void;

  /* Same row renderer passed into the main component. */
  renderRow: ThreadlineGroupProps['renderRow'];

  /* Same ordered row list passed into the main component. */
  rows: ThreadlineRow[];
};

const ContentColumn = memo(
  /* The content column is intentionally isolated from the SVG gutter so rows
     can render normally while still reporting measurements back to the parent.
     In this folder that means `PostComment`, nested `CommentThread`, and
     `RepliesToggleRow` stay focused on UI while this component owns the lines. */
  ({ rows, renderRow, onGroupLayout, onRowLayout, onAnchorWithinRow }: ContentColumnProps) => (
    <View onLayout={onGroupLayout} style={styles.content}>
      {rows.map((row) => (
        <View
          /* We wrap each rendered row so the parent can measure its top offset
             and height independently of whatever the row component renders. */
          key={row.id}
          onLayout={(e) => onRowLayout(row.id, e)}
        >
          {/* Rows receive a callback for reporting a connector anchor inside
              themselves. In the current implementation this ultimately comes
              from a `PostComment` avatar center, a nested `CommentThread`
              bubbling that same anchor upward, or a toggle button midpoint. */}
          {renderRow(row, { onAnchorWithinRow: (y) => onAnchorWithinRow(row.id, y) })}
        </View>
      ))}
    </View>
  ),
  (prev, next) =>
    /* `memo` only helps if all relevant inputs are referentially unchanged.
       This comparison avoids re-rendering the whole content column when the
       caller has not changed rows or callbacks. */
    prev.rows === next.rows &&
    prev.renderRow === next.renderRow &&
    prev.onGroupLayout === next.onGroupLayout &&
    prev.onRowLayout === next.onRowLayout &&
    prev.onAnchorWithinRow === next.onAnchorWithinRow,
);

ContentColumn.displayName = 'ThreadlineGroup.ContentColumn';

// ─── ThreadlineGroup ────────────────────────────────────────────────────────

const ThreadlineGroup: FC<ThreadlineGroupProps> = ({
  variant,
  rows,
  renderRow,
  onPressGutter,
  testID,
}) => {
  /* Measured total height of the content column. The gutter SVG uses this as
     its height so the path coordinate system matches the rows. */
  const [groupHeight, setGroupHeight] = useState(0);
  /* Refs hold the latest measurements synchronously so path updates can reuse
     fresh geometry even before React has committed the next render. */
  const rowRectsRef = useRef<Record<string, RowMeasurements>>({});

  /* Stores row-local anchor overrides reported by children. */
  const rowAnchorWithinRef = useRef<Record<string, number>>({});

  /* State copy of the row measurements that actually drives re-renders and
     recomputes the memoized SVG path strings. */
  const [rowRects, setRowRects] = useState<Record<string, RowMeasurements>>({});

  /* Resolve the visual geometry rules for the chosen depth variant. */
  const gutterWidth = getThreadlineColumnWidth(variant);
  const connectorX = getThreadlineConnectorX(variant);

  const onGroupLayout = useCallback((e: LayoutChangeEvent) => {
    /* React Native layout gives us the final rendered height of the entire
       content stack, which is exactly the vertical space the SVG must cover. */
    const h = e.nativeEvent.layout.height;
    /* Ignore sub-pixel churn from repeated layout passes. A 1px threshold keeps
       us from re-rendering the SVG on meaningless measurement noise. */
    setGroupHeight((prev) => (Math.abs(prev - h) >= 1 ? h : prev));
  }, []);

  const onRowLayout = useCallback((rowId: string, e: LayoutChangeEvent) => {
    /* Layout gives us this wrapper's top offset (`y`) and its full height
       inside the group coordinate system. */
    const { y, height } = e.nativeEvent.layout;
    /* Until a row provides a custom anchor, use its vertical midpoint. That is
       mostly a fallback path here, because `PostComment` and `RepliesToggleRow`
       both report more precise anchors after they mount. */
    /* Convert the row-local anchor into an absolute group-local Y coordinate,
       because the SVG path builder only understands one shared coordinate system. */
    const anchorWithin = rowAnchorWithinRef.current[rowId] ?? height / 2;
    const next: RowMeasurements = { y, height, anchorY: y + anchorWithin };

    /* Keep the ref and state in sync: the ref is for immediate mutable access,
       state is for triggering React to recompute and repaint the SVG. */
    rowRectsRef.current[rowId] = next;
    setRowRects((prev) => ({ ...prev, [rowId]: next }));
  }, []);

  const onAnchorWithinRow = useCallback((rowId: string, anchorYWithinRow: number) => {
    /* Rows can opt into a more precise visual anchor than their midpoint.
       In this folder that is how:
       - `PostComment` aligns the line to the avatar center
       - `RepliesToggleRow` aligns the line to the toggle button center
       - recursive child `CommentThread` bubbles its own self anchor upward */
    rowAnchorWithinRef.current[rowId] = anchorYWithinRow;
    const existing = rowRectsRef.current[rowId];

    /* If layout has not fired yet for this row, we cannot compute an absolute
       anchor position yet. We cache the local anchor and wait for `onRowLayout`. */
    if (!existing) return;
    const next: RowMeasurements = { ...existing, anchorY: existing.y + anchorYWithinRow };
    rowRectsRef.current[rowId] = next;
    setRowRects((prev) => ({ ...prev, [rowId]: next }));
  }, []);

  /* Path generation is derived data: whenever measurements, dimensions, or
     rows change, rebuild the SVG `d` strings for the spine and elbows. */
  const { spineD, elbowsD } = useMemo(
    () => computePaths({ connectorX, groupHeight, gutterWidth, rowRects, rows }),
    [connectorX, groupHeight, gutterWidth, rowRects, rows],
  );

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        accessibilityRole="button"
        disabled={!onPressGutter}
        onPress={onPressGutter}
        style={[styles.gutter, { width: gutterWidth }]}
      >
        {/* The gutter doubles as both interaction target and SVG canvas. We
            size the SVG from measured content height so the paths share the
            same vertical coordinate system as the row layouts. */}
        {groupHeight > 0 ? (
          <>
            {/* Only render the SVG once we know how tall it needs to be. */}
            <Svg height={groupHeight} width={gutterWidth}>
              {spineD ? (
                <>
                  {/* Single SVG path containing the vertical backbone segments. */}
                  <Path
                    d={spineD}
                    fill="none"
                    stroke={LINE_COLOR}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={LINE_WIDTH}
                  />
                </>
              ) : null}
              {elbowsD ? (
                <>
                  {/* Single SVG path containing all horizontal/curved branch
                      segments that connect the spine to rows. */}
                  <Path
                    d={elbowsD}
                    fill="none"
                    stroke={LINE_COLOR}
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    strokeWidth={LINE_WIDTH}
                  />
                </>
              ) : null}
            </Svg>
          </>
        ) : null}
      </Pressable>

      {/* Content renders beside the gutter, but continuously feeds layout and
          anchor information back up so the SVG can stay in sync with the
          recursive `CommentThread` tree rendered in this folder. */}
      <ContentColumn
        onAnchorWithinRow={onAnchorWithinRow}
        onGroupLayout={onGroupLayout}
        onRowLayout={onRowLayout}
        renderRow={renderRow}
        rows={rows}
      />
    </View>
  );
};

export default ThreadlineGroup;

const styles = StyleSheet.create({
  /* Horizontal layout: gutter on the left, rendered row content on the right. */
  container: { alignItems: 'flex-start', flexDirection: 'row' },

  /* Let the content column take remaining horizontal space and shrink safely
     when nested inside constrained layouts. */
  content: { flex: 1, minWidth: 0 },

  /* Stretch the pressable gutter to the same height as the content column so
     the SVG and hit area cover the full thread group. */
  gutter: { alignItems: 'stretch' },
});

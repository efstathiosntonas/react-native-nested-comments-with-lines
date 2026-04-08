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

export const THREADLINE_ROOT_COLUMN_WIDTH = 44;
export const THREADLINE_CHILD_COLUMN_WIDTH = 30;

const ELBOW_RADIUS = 30;
const ROOT_COLUMN_ANCHOR_X = 18;
const CHILD_COLUMN_ANCHOR_X = 11;
const ELBOW_END_GAP = 6;

export const LINE_COLOR = '#48484a';
export const LINE_WIDTH = 2;

export type ThreadlineColumnVariant = 'root' | 'child';

export type ThreadlineRowKind = 'self' | 'comment' | 'toggle';

export type ThreadlineRow = {
  id: string;
  isLastSibling: boolean;
  kind: ThreadlineRowKind;
};

type RowMeasurements = {
  anchorY: number;
  height: number;
  y: number;
};

type ThreadlineGroupProps = {
  onPressGutter?: () => void;
  renderRow: (
    row: ThreadlineRow,
    api: { onAnchorWithinRow: (y: number) => void },
  ) => ReactNode;
  rows: ThreadlineRow[];
  testID?: string;
  variant: ThreadlineColumnVariant;
};

export const getThreadlineColumnWidth = (variant: ThreadlineColumnVariant) =>
  variant === 'root' ? THREADLINE_ROOT_COLUMN_WIDTH : THREADLINE_CHILD_COLUMN_WIDTH;

export const getThreadlineConnectorX = (variant: ThreadlineColumnVariant) =>
  variant === 'root' ? ROOT_COLUMN_ANCHOR_X : CHILD_COLUMN_ANCHOR_X;

function computePaths(input: {
  connectorX: number;
  groupHeight: number;
  gutterWidth: number;
  rowRects: Record<string, RowMeasurements>;
  rows: ThreadlineRow[];
}): { spineD: string | null; elbowsD: string | null } {
  const { connectorX, groupHeight, gutterWidth, rowRects, rows } = input;
  if (groupHeight <= 0) return { spineD: null, elbowsD: null };

  const spinePaths: string[] = [];
  const elbowPaths: string[] = [];

  const measured = rows
    .map((row) => ({ row, m: rowRects[row.id] }))
    .filter((x): x is { row: ThreadlineRow; m: RowMeasurements } => x.m != null);

  if (measured.length === 0) return { spineD: null, elbowsD: null };

  const clamp = (y: number) => Math.max(0, Math.min(groupHeight, y));
  const horizontalEnd = Math.max(connectorX, gutterWidth - ELBOW_END_GAP);

  const first = measured[0];
  const last = measured[measured.length - 1];
  const startY = clamp(first.m.anchorY);
  const lastY = clamp(last.m.anchorY);

  const radius =
    last.row.kind === 'toggle'
      ? Math.min(
          ELBOW_RADIUS,
          Math.max(0, lastY - startY),
          Math.max(0, horizontalEnd - connectorX),
        )
      : 0;

  const spineEndY = last.row.kind === 'toggle' ? Math.max(startY, lastY - radius) : lastY;
  const shouldDrawCombinedElbow = last.row.kind === 'toggle' && radius > 0;

  if (shouldDrawCombinedElbow) {
    spinePaths.push(`M ${connectorX} ${startY} V ${spineEndY}`);
    elbowPaths.push(
      `M ${connectorX} ${spineEndY} Q ${connectorX} ${lastY} ${
        connectorX + radius
      } ${lastY} H ${horizontalEnd}`,
    );
  } else {
    if (Math.abs(spineEndY - startY) >= 1) {
      spinePaths.push(`M ${connectorX} ${startY} V ${spineEndY}`);
    }
    elbowPaths.push(`M ${connectorX} ${lastY} H ${horizontalEnd}`);
  }

  for (let i = 0; i < measured.length - 1; i++) {
    const { row, m } = measured[i];
    if (row.kind === 'self') continue;
    const y = clamp(m.anchorY);
    const r = Math.min(
      ELBOW_RADIUS,
      Math.max(0, y - startY),
      Math.max(0, horizontalEnd - connectorX),
    );
    elbowPaths.push(
      r > 0
        ? `M ${connectorX} ${y - r} Q ${connectorX} ${y} ${connectorX + r} ${y} H ${horizontalEnd}`
        : `M ${connectorX} ${y} H ${horizontalEnd}`,
    );
  }

  return {
    spineD: spinePaths.length ? spinePaths.join(' ') : null,
    elbowsD: elbowPaths.length ? elbowPaths.join(' ') : null,
  };
}

type ContentColumnProps = {
  onAnchorWithinRow: (rowId: string, y: number) => void;
  onGroupLayout: (e: LayoutChangeEvent) => void;
  onRowLayout: (rowId: string, e: LayoutChangeEvent) => void;
  renderRow: ThreadlineGroupProps['renderRow'];
  rows: ThreadlineRow[];
};

const ContentColumn = memo(
  ({ rows, renderRow, onGroupLayout, onRowLayout, onAnchorWithinRow }: ContentColumnProps) => (
    <View onLayout={onGroupLayout} style={styles.content}>
      {rows.map((row) => (
        <View
          key={row.id}
          onLayout={(e) => onRowLayout(row.id, e)}
        >
          {renderRow(row, { onAnchorWithinRow: (y) => onAnchorWithinRow(row.id, y) })}
        </View>
      ))}
    </View>
  ),
  (prev, next) =>
    prev.rows === next.rows &&
    prev.renderRow === next.renderRow &&
    prev.onGroupLayout === next.onGroupLayout &&
    prev.onRowLayout === next.onRowLayout &&
    prev.onAnchorWithinRow === next.onAnchorWithinRow,
);

ContentColumn.displayName = 'ThreadlineGroup.ContentColumn';

const ThreadlineGroup: FC<ThreadlineGroupProps> = ({
  variant,
  rows,
  renderRow,
  onPressGutter,
  testID,
}) => {
  const [groupHeight, setGroupHeight] = useState(0);
  const rowRectsRef = useRef<Record<string, RowMeasurements>>({});
  const rowAnchorWithinRef = useRef<Record<string, number>>({});
  const [rowRects, setRowRects] = useState<Record<string, RowMeasurements>>({});

  const gutterWidth = getThreadlineColumnWidth(variant);
  const connectorX = getThreadlineConnectorX(variant);

  const onGroupLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    setGroupHeight((prev) => (Math.abs(prev - h) >= 1 ? h : prev));
  }, []);

  const onRowLayout = useCallback((rowId: string, e: LayoutChangeEvent) => {
    const { y, height } = e.nativeEvent.layout;
    const anchorWithin = rowAnchorWithinRef.current[rowId] ?? height / 2;
    const next: RowMeasurements = { y, height, anchorY: y + anchorWithin };
    rowRectsRef.current[rowId] = next;
    setRowRects((prev) => ({ ...prev, [rowId]: next }));
  }, []);

  const onAnchorWithinRow = useCallback((rowId: string, anchorYWithinRow: number) => {
    rowAnchorWithinRef.current[rowId] = anchorYWithinRow;
    const existing = rowRectsRef.current[rowId];
    if (!existing) return;
    const next: RowMeasurements = { ...existing, anchorY: existing.y + anchorYWithinRow };
    rowRectsRef.current[rowId] = next;
    setRowRects((prev) => ({ ...prev, [rowId]: next }));
  }, []);

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
        {groupHeight > 0 ? (
          <Svg height={groupHeight} width={gutterWidth}>
            {spineD ? (
              <Path
                d={spineD}
                fill="none"
                stroke={LINE_COLOR}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={LINE_WIDTH}
              />
            ) : null}
            {elbowsD ? (
              <Path
                d={elbowsD}
                fill="none"
                stroke={LINE_COLOR}
                strokeLinecap="butt"
                strokeLinejoin="round"
                strokeWidth={LINE_WIDTH}
              />
            ) : null}
          </Svg>
        ) : null}
      </Pressable>

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
  container: { alignItems: 'flex-start', flexDirection: 'row' },
  content: { flex: 1, minWidth: 0 },
  gutter: { alignItems: 'stretch' },
});

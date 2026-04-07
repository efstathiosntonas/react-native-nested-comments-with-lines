import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg from 'react-native-svg';
import { formatDistanceToNow } from 'date-fns';

// ─── SVG line helpers (ported from styledComponents.tsx) ───────────────────

const LINE_COLOR = '#555';
const LINE_WIDTH = 2;

function leftFor(nested: number, hasChildren: boolean, variant: 'inner' | 'outer') {
  if (nested === 0) return hasChildren ? 14 : 0;
  if (variant === 'inner') {
    if (nested === 1) return hasChildren ? 50 : 22;
    return 50; // nested === 2
  }
  // outer
  if (nested === 1) return 22;
  return 22; // nested === 2
}

const TopRowBorderInner = ({
  nested, hasChildren, isLast, isParent, isLastParent,
}: {
  nested: number; hasChildren: boolean; isLast: boolean;
  isParent?: boolean; isLastParent?: boolean;
}) => (
  <Svg
    height={isLastParent ? '50%' : (!isParent && nested === 1) ? '100%' : !isLast ? '100%' : '50%'}
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'inner') }}
  />
);

const TopRowBorderOuter = ({
  nested, hasChildren, isLast, isLastParent,
}: {
  nested: number; hasChildren: boolean; isLast: boolean; isLastParent: boolean;
}) => (
  <Svg
    height={isLast && nested !== 0 ? '100%' : !isLastParent ? '100%' : '50%'}
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'outer') }}
  />
);

const ContentBorderInner = ({ nested, hasChildren }: { nested: number; hasChildren: boolean }) => (
  <Svg
    height="110%"
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'inner') }}
  />
);

const ContentBorderOuter = ({ nested, hasChildren }: { nested: number; hasChildren: boolean }) => (
  <Svg
    height="108%"
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'outer') }}
  />
);

const ActionBorderInner = ({ nested, hasChildren }: { nested: number; hasChildren: boolean }) => (
  <Svg
    height="140%"
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'inner') }}
  />
);

const ActionBorderOuter = ({ nested, hasChildren }: { nested: number; hasChildren: boolean }) => (
  <Svg
    height="108%"
    width={LINE_WIDTH}
    style={{ backgroundColor: LINE_COLOR, position: 'absolute', left: leftFor(nested, hasChildren, 'outer') }}
  />
);

const HorizontalTier = ({ nested }: { nested: number }) => (
  <Svg
    height={nested !== 1 ? 1 : 2}
    width={nested === 2 ? 12 : 10}
    style={{
      backgroundColor: LINE_COLOR,
      position: 'absolute',
      left: nested === 1 ? 24 : 50,
      top: nested !== 1 ? 26 : 24,
    }}
  />
);

// ─── Avatar size by nesting ────────────────────────────────────────────────

function avatarSize(nested: number) {
  return nested === 0 ? 36 : 28;
}

// ─── Timestamp ─────────────────────────────────────────────────────────────

function timeAgo(dateStr: string) {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return '';
  }
}

// ─── Component ─────────────────────────────────────────────────────────────

type CommentProps = {
  comment: any;
  index: number;
  nested: number;
  hasChildren: boolean;
  totalChildren: number;
  isParent?: boolean;
  parentCommentLength: number;
  lastCommentParentId?: string;
  lastCommentGrandId?: string;
  isLast: boolean;
  isParentLast?: boolean;
  postAuthorId?: string;
};

const Comment = ({
  comment,
  index,
  nested,
  hasChildren,
  totalChildren,
  isParent,
  parentCommentLength,
  lastCommentParentId,
  lastCommentGrandId,
  isLast,
  isParentLast,
  postAuthorId,
}: CommentProps) => {
  const isLastParent =
    lastCommentParentId === comment.parent_comment_id &&
    parentCommentLength - 1 === index;
  const isLastGrand = lastCommentGrandId === comment.id;
  const isAuthor = postAuthorId != null && comment.author_id === postAuthorId;

  const avatarUri = comment?.author_profile?.profile_images?.[0]?.uri;
  const name: string = comment?.author_profile?.first_name ?? '';
  const size = avatarSize(nested);

  // Margin-left for the container based on nesting
  const containerMarginLeft = nested === 1 || nested === 2 ? 12 : 22;

  // Margin-left for the top row (avatar + name row)
  const topRowMarginLeft =
    nested === 0 && !hasChildren ? 0
    : hasChildren && nested === 0 ? 0
    : hasChildren && nested === 1 ? 38
    : !hasChildren && nested === 1 ? 38
    : !hasChildren && nested === 2 ? 66
    : 0;

  // Margin-left for the content bubble
  const contentMarginLeft =
    nested === 0 && !hasChildren ? 0
    : hasChildren && nested === 0 ? size + 8
    : hasChildren && nested === 1 ? 66
    : !hasChildren && nested === 1 ? 68
    : !hasChildren && nested === 2 ? 94
    : 0;

  return (
    <View style={[styles.container, { marginLeft: containerMarginLeft }]}>
      {/* TOP ROW — avatar + name */}
      <View style={styles.row}>
        {nested !== 0 && (
          <TopRowBorderInner
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isParent={isParent}
            isLastParent={isLastParent}
          />
        )}

        {isParent && hasChildren && nested === 1 && !isLast && (
          <TopRowBorderOuter
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent}
          />
        )}

        {!isLast && isParent && hasChildren && nested === 1 && index - 1 < totalChildren && (
          <TopRowBorderOuter
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent}
          />
        )}

        {nested === 2 && !isParentLast && (
          <TopRowBorderOuter
            hasChildren={hasChildren}
            nested={nested}
            isLast={isLast}
            isLastParent={isLastParent ?? false}
          />
        )}

        {nested !== 0 && <HorizontalTier nested={nested} />}

        <View style={[styles.topRow, { marginLeft: topRowMarginLeft }]}>
          <TouchableOpacity style={styles.authorRow} activeOpacity={0.8} onPress={() => {}}>
            {/* Avatar */}
            <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  style={{ width: size, height: size, borderRadius: size / 2 }}
                  resizeMode="cover"
                />
              ) : null}
            </View>

            {/* Name + badges + timestamp */}
            <View style={styles.nameMeta}>
              <View style={styles.nameRow}>
                <Text style={[styles.name, name.length > 15 && styles.nameSmall]}>{name}</Text>
                {isAuthor && <Text style={styles.authorBadge}> · Author</Text>}
                <Text style={styles.timestamp}> · {timeAgo(comment.created_at)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT BUBBLE */}
      <View style={styles.contentWrapper}>
        {nested === 1 && hasChildren && (
          <ContentBorderInner hasChildren={hasChildren} nested={nested} />
        )}
        {!isLast && !isLastParent && nested === 2 && (
          <ContentBorderInner hasChildren={hasChildren} nested={nested} />
        )}
        {!isLastGrand && isLastParent && (
          <ContentBorderInner hasChildren={hasChildren} nested={nested} />
        )}
        {isParent && hasChildren && nested === 0 && (
          <ContentBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {nested === 1 && !isLast && !isParent && (
          <ContentBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {isParent && hasChildren && nested === 1 && !isLast && (
          <ContentBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {nested === 2 && !isParentLast && (
          <ContentBorderOuter hasChildren={hasChildren} nested={nested} />
        )}

        <View style={[styles.bubble, { marginLeft: contentMarginLeft }]}>
          <Text style={styles.contentText}>{comment.content}</Text>
          {comment.edited_at && <Text style={styles.editedText}>(edited)</Text>}
        </View>
      </View>

      {/* ACTION ROW */}
      <View style={[styles.row, { marginLeft: contentMarginLeft }]}>
        {nested === 1 && hasChildren && (
          <ActionBorderInner hasChildren={hasChildren} nested={nested} />
        )}
        {!isLast && !isLastParent && nested === 2 && (
          <ActionBorderInner hasChildren={hasChildren} nested={nested} />
        )}
        {isParent && hasChildren && nested === 0 && (
          <ActionBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {nested === 1 && !isLast && !isParent && (
          <ActionBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {isParent && hasChildren && nested === 1 && !isLast && (
          <ActionBorderOuter hasChildren={hasChildren} nested={nested} />
        )}
        {nested === 2 && !isParentLast && (
          <ActionBorderOuter hasChildren={hasChildren} nested={nested} />
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => {}}>
            <Text style={styles.actionText}>Love</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => {}}>
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
          {comment.total_comment_likes > 0 && (
            <Text style={styles.likeCount}>{comment.total_comment_likes} ❤️</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'column',
    marginRight: 12,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    backgroundColor: '#444',
    marginRight: 8,
    overflow: 'hidden',
  },
  nameMeta: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  nameSmall: {
    fontSize: 12,
  },
  authorBadge: {
    color: '#ff6b35',
    fontSize: 12,
    fontWeight: '600',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  bubble: {
    backgroundColor: '#2c2c2e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
    marginBottom: 4,
  },
  contentText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  editedText: {
    color: '#888',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingBottom: 8,
    gap: 16,
  },
  actionBtn: {
    paddingVertical: 2,
  },
  actionText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '500',
  },
  likeCount: {
    color: '#888',
    fontSize: 13,
  },
});

import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import PostComment from './PostComment';
import RepliesToggleRow from './RepliesToggleRow';
import ThreadlineGroup, {
  getThreadlineColumnWidth,
  ThreadlineRow,
} from './ThreadlineGroup';
import type { Comment } from './types';

interface CommentThreadProps {
  comment: Comment;
  level: number;
  onSelfAnchorWithinRow?: (y: number) => void;
  postAuthorId: string;
}

const CommentThreadComponent = ({
  comment,
  level,
  onSelfAnchorWithinRow,
  postAuthorId,
}: CommentThreadProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childComments = comment.childComments ?? [];
  const hasChildren = childComments.length > 0 || (comment.childCommentCount ?? 0) > 0;
  const repliesCount = childComments.length || comment.childCommentCount || 0;

  const handleToggleReplies = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const selfOffset = useMemo(
    () => getThreadlineColumnWidth(level === 0 ? 'root' : 'child'),
    [level],
  );

  const threadRows: ThreadlineRow[] = useMemo(() => {
    const selfRow: ThreadlineRow = {
      id: `self-${comment.id}`,
      isLastSibling: !hasChildren,
      kind: 'self',
    };

    if (!hasChildren) {
      return [selfRow];
    }

    const toggleRow: ThreadlineRow = {
      id: `toggle-${comment.id}`,
      isLastSibling: true,
      kind: 'toggle',
    };

    if (!isExpanded || childComments.length === 0) {
      return [selfRow, toggleRow];
    }

    const children = childComments.map((c, idx) => ({
      id: c.id,
      isLastSibling: idx === childComments.length - 1,
      kind: 'comment' as const,
    }));
    return [selfRow, ...children, toggleRow];
  }, [childComments, comment.id, isExpanded, hasChildren]);

  const childMap = useMemo(() => {
    const map = new Map<string, Comment>();
    childComments.forEach((c) => map.set(c.id, c));
    return map;
  }, [childComments]);

  const renderThreadRow = useCallback(
    (row: ThreadlineRow, api: { onAnchorWithinRow: (y: number) => void }) => {
      if (row.kind === 'self') {
        const handleAnchorWithinRow = (y: number) => {
          api.onAnchorWithinRow(y);
          onSelfAnchorWithinRow?.(y);
        };
        return (
          <View pointerEvents="box-none" style={{ marginLeft: -selfOffset }}>
            <PostComment
              comment={comment}
              isHighlightedForReply={false}
              level={level}
              onAvatarAnchorWithinRow={handleAnchorWithinRow}
              postAuthorId={postAuthorId}
            />
          </View>
        );
      }

      if (row.kind === 'toggle') {
        return (
          <RepliesToggleRow
            isExpanded={isExpanded}
            onAnchorWithinRow={api.onAnchorWithinRow}
            onToggle={handleToggleReplies}
            repliesCount={repliesCount}
            testID={`replies-toggle-${comment.id}`}
          />
        );
      }

      // kind === 'comment'
      const childComment = childMap.get(row.id);
      if (!childComment) return null;

      return (
        <CommentThread
          comment={childComment}
          key={childComment.id}
          level={level + 1}
          onSelfAnchorWithinRow={api.onAnchorWithinRow}
          postAuthorId={postAuthorId}
        />
      );
    },
    [
      childComments,
      childMap,
      comment,
      handleToggleReplies,
      isExpanded,
      level,
      onSelfAnchorWithinRow,
      postAuthorId,
      repliesCount,
      selfOffset,
    ],
  );

  return (
    <ThreadlineGroup
      onPressGutter={handleToggleReplies}
      renderRow={renderThreadRow}
      rows={threadRows}
      testID={`threadline-group-${comment.id}`}
      variant={level === 0 ? 'root' : 'child'}
    />
  );
};

export const CommentThread = memo(CommentThreadComponent);
CommentThread.displayName = 'CommentThread';

export default CommentThread;

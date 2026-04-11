import React, { useCallback, useRef } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import CommentBody from './CommentBody';
import CommentFooter from './CommentFooter';
import PostCommentAvatar, { getAvatarSize } from './PostCommentAvatar';
import type { Comment } from './types';

type Props = {
  comment: Comment;
  isHighlightedForReply?: boolean;
  level: number;
  onAvatarAnchorWithinRow?: (y: number) => void;
  postAuthorId: string;
};

const PostComment = ({
  comment,
  isHighlightedForReply,
  level,
  onAvatarAnchorWithinRow,
  postAuthorId,
}: Props) => {
  const avatarSize = getAvatarSize(level);
  const topRowYRef = useRef(0);

  const onTopRowLayout = useCallback((e: LayoutChangeEvent) => {
    topRowYRef.current = e.nativeEvent.layout.y;
  }, []);

  const onAvatarLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { y, height } = e.nativeEvent.layout;
      onAvatarAnchorWithinRow?.(topRowYRef.current + y + height / 2);
    },
    [onAvatarAnchorWithinRow],
  );

  return (
    <View style={styles.container}>
      <View onLayout={onTopRowLayout} style={styles.topRow}>
        <View onLayout={onAvatarLayout} style={styles.avatarSpacer}>
          <PostCommentAvatar avatarUri={comment.authorProfile.avatarUri} level={level} />
        </View>
        <View style={styles.contentColumn}>
          <CommentBody
            comment={comment}
            isHighlightedForReply={isHighlightedForReply}
            postAuthorId={postAuthorId}
          />
        </View>
      </View>
      <View style={{ paddingLeft: avatarSize }}>
        <CommentFooter comment={comment} level={level} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarSpacer: { marginRight: 8 },
  container: { flexDirection: 'column', paddingVertical: 12 },
  contentColumn: { flex: 1, gap: 8, minWidth: 0 },
  topRow: { alignItems: 'flex-start', flexDirection: 'row' },
});

export default PostComment;

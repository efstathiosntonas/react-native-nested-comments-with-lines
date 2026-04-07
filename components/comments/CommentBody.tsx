import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PostCommentName from './PostCommentName';
import type { Comment } from './types';

type Props = {
  comment: Comment;
  isHighlightedForReply?: boolean;
  postAuthorId: string;
};

const CommentBody = ({ comment, isHighlightedForReply, postAuthorId }: Props) => (
  <View
    style={[
      styles.container,
      isHighlightedForReply ? styles.highlighted : styles.normal,
    ]}
  >
    <PostCommentName comment={comment} postAuthorId={postAuthorId} />
    {comment.content.length > 0 ? (
      <Text style={styles.content}>{comment.content}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
    flexShrink: 1,
    maxWidth: '100%',
    minWidth: 0,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#262626',
  },
  content: {
    color: '#ECECEC',
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 2,
    paddingTop: 4,
  },
  highlighted: {
    borderColor: '#4A9EFF',
  },
  normal: {
    borderColor: 'transparent',
  },
});

export default CommentBody;

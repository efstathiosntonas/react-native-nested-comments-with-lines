import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Comment } from './types';

type Props = {
  comment: Comment;
  level: number;
};

const CommentFooter = ({ comment, level }: Props) => {
  const [liked, setLiked] = useState(comment.commentLiked);
  const [likeCount, setLikeCount] = useState(comment.totalCommentLikes);

  const onLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  return (
    <View style={styles.container} testID="comment-footer">
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <Pressable
            accessibilityRole="button"
            onPress={onLike}
            style={styles.likeButton}
            testID="comment-footer-like-button"
          >
            <Text style={[styles.actionText, liked && styles.likedText]}>Love</Text>
            {likeCount > 0 ? (
              <Text style={[styles.countText, liked && styles.likedText]}>
                {' '}{likeCount}
              </Text>
            ) : null}
          </Pressable>

          {level < 3 ? (
            <View style={styles.replyButton}>
              <Text style={styles.actionText}>Reply</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: '#707070',
    fontSize: 13,
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  countText: {
    color: '#707070',
    fontSize: 13,
  },
  innerContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 4,
    marginRight: 8,
    marginTop: 6,
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  likeButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  likedText: {
    color: '#4A9EFF',
  },
  replyButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
  },
});

export default CommentFooter;

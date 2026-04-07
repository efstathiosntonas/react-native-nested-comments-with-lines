import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatDistanceToNow } from 'date-fns';

import type { Comment } from './types';

type Props = {
  comment: Comment;
  postAuthorId: string;
};

const PostCommentName = ({ comment, postAuthorId }: Props) => {
  const isAuthor = postAuthorId === comment.authorId;
  const isStaff = comment.authorProfile.isStaff;
  const isEdited = !!comment.editedAt;

  const timeText = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <View style={styles.container} testID="post-comment-name">
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {comment.authorProfile.firstName}
          </Text>
          {isStaff ? (
            <View style={styles.staffBadge}>
              <Text style={styles.staffText}>Staff</Text>
            </View>
          ) : null}
          {isAuthor ? (
            <View style={styles.authorBadge}>
              <Text style={styles.authorText}>Author</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.timeContainer}>
          <Text accessible={false} style={styles.dot}>·</Text>
          <Text numberOfLines={1} style={styles.time}>{timeText}</Text>
          {isEdited ? (
            <>
              <Text accessible={false} style={styles.dot}>·</Text>
              <Text style={styles.edited}>(edited)</Text>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authorBadge: {
    backgroundColor: '#E07820',
    borderRadius: 4,
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  authorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 8,
  },
  dot: {
    color: '#707070',
    flexShrink: 0,
    fontSize: 11,
    marginHorizontal: 4,
  },
  edited: {
    color: '#707070',
    flexShrink: 0,
    fontSize: 11,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
    minWidth: 0,
  },
  name: {
    color: '#ECECEC',
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    minWidth: 0,
  },
  staffBadge: {
    backgroundColor: '#4A9EFF',
    borderRadius: 4,
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  staffText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  time: {
    color: '#707070',
    flexShrink: 1,
    fontSize: 11,
    minWidth: 0,
  },
  timeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    minWidth: 0,
  },
});

export default PostCommentName;

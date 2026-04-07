import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  avatarUri?: string;
  level: number;
};

export const AVATAR_SIZE_ROOT = 36;
export const AVATAR_SIZE_CHILD = 22;

export const getAvatarSize = (level: number) =>
  level === 0 ? AVATAR_SIZE_ROOT : AVATAR_SIZE_CHILD;

const PostCommentAvatar = ({ avatarUri, level }: Props) => {
  const size = getAvatarSize(level);
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {avatarUri ? (
        <Image
          source={{ uri: avatarUri }}
          style={[styles.image, { borderRadius: size / 2 }]}
        />
      ) : (
        <View style={[styles.placeholder, { borderRadius: size / 2 }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, backgroundColor: '#404040' },
});

export default PostCommentAvatar;

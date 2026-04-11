import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';


import CommentThread from './components/comments/CommentThread';
import { mockComments } from './components/comments/mockData';
import type { Comment } from './components/comments/types';

const POST_AUTHOR_ID = 'user-3';

export default function App() {
  return (
      <SafeAreaView style={styles.safe}>
        <FlatList<Comment>
          data={mockComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentThread
              comment={item}
              level={0}
              postAuthorId={POST_AUTHOR_ID}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#111' },
  list: { paddingVertical: 8 },
});

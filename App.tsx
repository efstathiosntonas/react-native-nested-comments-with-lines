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
          renderItem={({ item, index }) => (
            <CommentThread
              comment={item}
              index={index}
              isLastInLevel={index === mockComments.length - 1}
              level={0}
              postAuthorId={POST_AUTHOR_ID}
              siblingsCount={mockComments.length}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111' },
  safe: { flex: 1, backgroundColor: '#111' },
  list: { paddingVertical: 8 },
});

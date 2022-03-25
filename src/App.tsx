import React, {useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getLastChildCommentId, getLastChildCommentIdFromParent} from './utils';
import CollapsibleView from './components/CollapsibleView';
import Comment from './components/Comment';
import {comments} from './comments';

const dimensions = Dimensions.get('window');

const App = () => {
  const keyExtractor = useCallback(item => item.id, []);

  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <>
          {!item.parent_comment_id ? (
            <Comment
              comment={item}
              hasChildren={item?.child_comments?.length > 0}
              index={index}
              isParent
              lastCommentParentId={getLastChildCommentIdFromParent(item)}
              lastCommentGrandId={getLastChildCommentId(item)}
              nested={0}
              isParentLast={false}
              // @ts-ignore
              isLast={item.id === comments[comments?.length - 1].id}
              parentCommentLength={0}
              totalChildren={item?.child_comments?.length || 0}
            />
          ) : null}

          {item?.child_comments?.length > 0 ? (
            <CollapsibleView
              arrowStyling={styles.arrow}
              initExpanded={true}
              nested={1}
              length={item?.child_comments?.length} // length of parent comments
              titleStyle={styles.showMoreComments}
              lastCommentIndex={item.child_comments.findIndex(
                (comment: any) => comment.id === getLastChildCommentId(item)
              )}
              title={
                item?.child_comments?.length === 1
                  ? `show ${item?.child_comments?.length} reply`
                  : `show ${item?.child_comments?.length} replies`
              }
              collapsedTitle={
                item?.child_comments?.length === 1
                  ? 'hide reply'
                  : 'hide replies'
              }
              parentCommentLength={item?.child_comments?.length || 0}
              unmountOnCollapse>
              {item.child_comments.map((levelOneComment: any, idx: number) => {
                return (
                  <React.Fragment key={levelOneComment.id}>
                    <Comment
                      comment={levelOneComment}
                      hasChildren={levelOneComment?.child_comments?.length > 0}
                      index={idx}
                      key={item.id}
                      lastCommentParentId={getLastChildCommentIdFromParent(
                        item
                      )}
                      lastCommentGrandId={getLastChildCommentId(item)}
                      nested={1}
                      isParentLast={
                        levelOneComment.id ===
                        item.child_comments[item.child_comments.length - 1].id
                      }
                      isParent={levelOneComment?.child_comments?.length > 0}
                      parentCommentLength={item?.child_comments?.length || 0}
                      totalChildren={
                        levelOneComment?.child_comments?.length || 0
                      }
                      isLast={
                        levelOneComment.id ===
                        item.child_comments[item.child_comments.length - 1].id
                      }
                    />
                    {levelOneComment?.child_comments?.length > 0 ? (
                      <CollapsibleView
                        arrowStyling={styles.arrow}
                        initExpanded={false}
                        nested={2}
                        length={levelOneComment?.child_comments?.length}
                        lastCommentIndex={levelOneComment.child_comments.findIndex(
                          (comment: any) =>
                            comment.id ===
                            getLastChildCommentId(levelOneComment)
                        )}
                        title={
                          levelOneComment?.child_comments?.length === 1
                            ? `show ${levelOneComment?.child_comments?.length} reply`
                            : `show ${levelOneComment?.child_comments?.length} replies`
                        }
                        collapsedTitle={
                          levelOneComment?.child_comments?.length === 1
                            ? 'hide reply'
                            : 'hide replies'
                        }
                        isParentLast={
                          levelOneComment.id ===
                          item.child_comments[item.child_comments.length - 1].id
                        }
                        parentCommentLength={
                          levelOneComment.child_comments.length
                        }
                        titleStyle={styles.showMoreCommentsTwo}
                        unmountOnCollapse>
                        {levelOneComment.child_comments.map(
                          (levelTwoComment: any, idxTwo: number) => {
                            return (
                              <React.Fragment key={levelTwoComment.id}>
                                <Comment
                                  comment={levelTwoComment}
                                  hasChildren={false}
                                  index={idxTwo}
                                  key={levelTwoComment.id}
                                  lastCommentParentId={getLastChildCommentIdFromParent(
                                    levelOneComment
                                  )}
                                  nested={2}
                                  lastCommentGrandId={getLastChildCommentId(
                                    levelOneComment
                                  )}
                                  parentCommentLength={
                                    levelOneComment.child_comments.length
                                  }
                                  isLast={
                                    levelTwoComment.id ===
                                    levelOneComment.child_comments[
                                      levelOneComment.child_comments.length - 1
                                    ].id
                                  }
                                  isParentLast={
                                    levelOneComment.id ===
                                    item.child_comments[
                                      item.child_comments.length - 1
                                    ].id
                                  }
                                  totalChildren={
                                    levelOneComment?.child_comments?.length || 0
                                  }
                                />
                              </React.Fragment>
                            );
                          }
                        )}
                      </CollapsibleView>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </CollapsibleView>
          ) : null}
        </>
      );
    },
    [comments, getLastChildCommentId, getLastChildCommentIdFromParent]
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.flatListWrapper}>
        <FlatList
          initialNumToRender={30}
          maxToRenderPerBatch={30}
          data={comments}
          keyExtractor={keyExtractor}
          style={styles.flatList}
          scrollEventThrottle={500}
          renderItem={renderItems}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  },
  flatList: {
    flex: 1,
    marginBottom: getBottomSpace() + 60,
    minHeight: dimensions.height - (getBottomSpace() + 160)
  },
  flatListWrapper: {
    flex: 1,
    flexGrow: 1
  },
  arrow: {
    size: 24,
    thickness: 2,
    color: 'grey'
  },
  showMoreComments: {
    marginLeft: 12,
    color: 'grey'
  },
  showMoreCommentsTwo: {
    marginLeft: 12,
    marginTop: 8,
    color: 'grey'
  }
});

export default App;

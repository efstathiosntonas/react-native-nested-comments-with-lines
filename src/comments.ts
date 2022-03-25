export const comments = [
  {
    __typename: 'comment',
    id: 'f7711b6c-2906-4b75-a1d7-c05e93a84b09',
    author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
    edited_at: null,
    comment_liked: false,
    content: 'Testing nested comments!',
    created_at: '2022-03-25T10:51:02.305885+00:00',

    parent_comment_id: null,
    post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
    post: {
      __typename: 'post',
      id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
    },
    parent_comment: null,
    author_profile: {
      __typename: 'profile',
      id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
      first_name: 'Stathis',
      is_online: false,
      is_staff: false,
      latest_login: '2022-03-25T09:19:14.847+00:00',
      show_online_status: true,
      profile_images: [
        {
          __typename: 'profile_image',
          id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
          avatar: true,
          file_name: 'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
          height: 2048,
          order: 0,
          profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
          uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
          width: 1151
        }
      ]
    },
    comment_images: [],
    total_comment_likes: 0,
    comment_likes_aggregate: {
      __typename: 'comment_like_aggregate',
      nodes: []
    },
    child_comments: [
      {
        __typename: 'comment',
        id: '971a873d-4d45-40c9-9568-48e5b7f4837d',
        author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
        author_profile: {
          __typename: 'profile',
          id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
          first_name: 'Stathis',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T09:19:14.847+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
              avatar: true,
              file_name:
                'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
              height: 2048,
              order: 0,
              profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
              width: 1151
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'Hello there',
        created_at: '2022-03-25T10:51:08.107302+00:00',
        edited_at: null,

        parent_comment_id: 'f7711b6c-2906-4b75-a1d7-c05e93a84b09',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: 'f7711b6c-2906-4b75-a1d7-c05e93a84b09'
        },
        child_comments: []
      }
    ]
  },
  {
    __typename: 'comment',
    id: '59c89a27-7cf9-4bd9-a499-06ed5f754161',
    author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
    edited_at: null,
    comment_liked: false,
    content: 'I hope everything is fine',
    created_at: '2022-03-22T18:41:32.728687+00:00',

    parent_comment_id: null,
    post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
    post: {
      __typename: 'post',
      id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
    },
    parent_comment: null,
    author_profile: {
      __typename: 'profile',
      id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
      first_name: 'Stathis',
      is_online: false,
      is_staff: false,
      latest_login: '2022-03-25T09:19:14.847+00:00',
      show_online_status: true,
      profile_images: [
        {
          __typename: 'profile_image',
          id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
          avatar: true,
          file_name: 'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
          height: 2048,
          order: 0,
          profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

          uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
          width: 1151
        }
      ]
    },
    comment_images: [],
    total_comment_likes: 0,
    comment_likes_aggregate: {
      __typename: 'comment_like_aggregate',
      nodes: []
    },
    child_comments: [
      {
        __typename: 'comment',
        id: 'c0421b09-2d05-4aec-8a56-e1b4089988ab',
        author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
        author_profile: {
          __typename: 'profile',
          id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
          first_name: 'Stathis',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T09:19:14.847+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
              avatar: true,
              file_name:
                'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
              height: 2048,
              order: 0,
              profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
              width: 1151
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'This is nice commenting tree!',
        created_at: '2022-03-22T18:41:57.701034+00:00',
        edited_at: null,

        parent_comment_id: '59c89a27-7cf9-4bd9-a499-06ed5f754161',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: '59c89a27-7cf9-4bd9-a499-06ed5f754161'
        },
        child_comments: []
      },
      {
        __typename: 'comment',
        id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c',
        author_id: '7c2APxuPmdbny7W63078ooypNZx2',
        author_profile: {
          __typename: 'profile',
          id: '7c2APxuPmdbny7W63078ooypNZx2',
          first_name: 'Pete',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T10:41:34.645+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: '044c44f4-a42f-4f22-b2a8-fa3e0d559ea9',
              avatar: true,
              file_name:
                'gsgva--Bpwlq_7E95074F-9993-4255-BE30-EA7A36E06F31.jpg',
              height: 2048,
              order: 0,
              profile_id: '7c2APxuPmdbny7W63078ooypNZx2',

              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267011',
              width: 1750
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'Doing well',
        created_at: '2022-03-23T11:23:31.176812+00:00',
        edited_at: null,

        parent_comment_id: '59c89a27-7cf9-4bd9-a499-06ed5f754161',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: '59c89a27-7cf9-4bd9-a499-06ed5f754161'
        },
        child_comments: [
          {
            __typename: 'comment',
            id: '24928489-f584-4c0c-81c1-a470ead5a291',
            author_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
            author_profile: {
              __typename: 'profile',
              id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
              first_name: 'Team Four',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:16.806+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: 'e0b577b4-6656-4dee-87c1-0005b4c7049c',
                  avatar: true,
                  file_name:
                    'eqYoHHDkPjwr_88EE2A5F-E08C-457D-9F41-2C27A867EF5A.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267022',
                  width: 1154
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'Hey',
            created_at: '2022-03-24T12:15:31.319729+00:00',
            edited_at: null,

            parent_comment_id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c'
            }
          },
          {
            __typename: 'comment',
            id: '1d784251-3ae3-491c-9b92-a8533b3e624f',
            author_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
            author_profile: {
              __typename: 'profile',
              id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
              first_name: 'Team Four',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:16.806+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: 'e0b577b4-6656-4dee-87c1-0005b4c7049c',
                  avatar: true,
                  file_name:
                    'eqYoHHDkPjwr_88EE2A5F-E08C-457D-9F41-2C27A867EF5A.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267022',
                  width: 1154
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'Life as a react native developer is wonderful!',
            created_at: '2022-03-24T12:15:41.92462+00:00',
            edited_at: null,

            parent_comment_id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c'
            }
          },
          {
            __typename: 'comment',
            id: '14e7aed5-2022-4a87-8a38-0d4569350613',
            author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
            author_profile: {
              __typename: 'profile',
              id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              first_name: 'Stathis',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:14.847+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
                  avatar: true,
                  file_name:
                    'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
                  width: 1151
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'Hahaha! true story',
            created_at: '2022-03-25T10:16:47.489903+00:00',
            edited_at: null,

            parent_comment_id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '0d583b8e-2874-420a-8e0b-d407cbce2b8c'
            }
          }
        ]
      }
    ]
  },
  {
    __typename: 'comment',
    id: '4298fbb4-6f93-4a08-b701-d84a52f673b9',
    author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
    edited_at: null,
    comment_liked: false,
    content: 'But why?',
    created_at: '2022-03-22T18:36:07.867808+00:00',

    parent_comment_id: null,
    post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
    post: {
      __typename: 'post',
      id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
    },
    parent_comment: null,
    author_profile: {
      __typename: 'profile',
      id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
      first_name: 'Stathis',
      is_online: false,
      is_staff: false,
      latest_login: '2022-03-25T09:19:14.847+00:00',
      show_online_status: true,
      profile_images: [
        {
          __typename: 'profile_image',
          id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
          avatar: true,
          file_name: 'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
          height: 2048,
          order: 0,
          profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

          uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
          width: 1151
        }
      ]
    },
    comment_images: [],
    total_comment_likes: 0,
    comment_likes_aggregate: {
      __typename: 'comment_like_aggregate',
      nodes: []
    },
    child_comments: [
      {
        __typename: 'comment',
        id: '12f6f3b3-3a5c-49fc-83ba-3e5607add57d',
        author_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
        author_profile: {
          __typename: 'profile',
          id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
          first_name: 'Team Four',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T09:19:16.806+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: 'e0b577b4-6656-4dee-87c1-0005b4c7049c',
              avatar: true,
              file_name:
                'eqYoHHDkPjwr_88EE2A5F-E08C-457D-9F41-2C27A867EF5A.jpg',
              height: 2048,
              order: 0,
              profile_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',

              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267022',
              width: 1154
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'This is a nice comment, thank you!',
        created_at: '2022-03-24T13:00:53.537299+00:00',
        edited_at: null,

        parent_comment_id: '4298fbb4-6f93-4a08-b701-d84a52f673b9',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: '4298fbb4-6f93-4a08-b701-d84a52f673b9'
        },
        child_comments: []
      }
    ]
  },
  {
    __typename: 'comment',
    id: 'ba1ff72d-d0d7-4f0e-b9fa-fbd9c8c1901c',
    author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
    edited_at: null,
    comment_liked: false,
    content: 'Hey Kath!',
    created_at: '2022-03-22T18:34:17.216374+00:00',

    parent_comment_id: null,
    post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
    post: {
      __typename: 'post',
      id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
    },
    parent_comment: null,
    author_profile: {
      __typename: 'profile',
      id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
      first_name: 'Stathis',
      is_online: false,
      is_staff: false,
      latest_login: '2022-03-25T09:19:14.847+00:00',
      show_online_status: true,
      profile_images: [
        {
          __typename: 'profile_image',
          id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
          avatar: true,
          file_name: 'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
          height: 2048,
          order: 0,
          profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

          uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
          width: 1151
        }
      ]
    },
    comment_images: [],
    total_comment_likes: 0,
    comment_likes_aggregate: {
      __typename: 'comment_like_aggregate',
      nodes: []
    },
    child_comments: [
      {
        __typename: 'comment',
        id: '5fbbf473-6d84-424f-a6d0-113438037fc2',
        author_id: '7c2APxuPmdbny7W63078ooypNZx2',
        author_profile: {
          __typename: 'profile',
          id: '7c2APxuPmdbny7W63078ooypNZx2',
          first_name: 'Pete',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T10:41:34.645+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: '044c44f4-a42f-4f22-b2a8-fa3e0d559ea9',
              avatar: true,
              file_name:
                'gsgva--Bpwlq_7E95074F-9993-4255-BE30-EA7A36E06F31.jpg',
              height: 2048,
              order: 0,
              profile_id: '7c2APxuPmdbny7W63078ooypNZx2',

              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267011',
              width: 1750
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'Hi there!',
        created_at: '2022-03-22T18:34:27.94634+00:00',
        edited_at: null,

        parent_comment_id: 'ba1ff72d-d0d7-4f0e-b9fa-fbd9c8c1901c',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: 'ba1ff72d-d0d7-4f0e-b9fa-fbd9c8c1901c'
        },
        child_comments: [
          {
            __typename: 'comment',
            id: '3c45b387-b8b0-4f4b-9846-5f541dcefdcc',
            author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
            author_profile: {
              __typename: 'profile',
              id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              first_name: 'Stathis',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:14.847+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
                  avatar: true,
                  file_name:
                    'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
                  width: 1151
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'How are you?',
            created_at: '2022-03-22T18:34:43.792907+00:00',
            edited_at: null,

            parent_comment_id: '5fbbf473-6d84-424f-a6d0-113438037fc2',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '5fbbf473-6d84-424f-a6d0-113438037fc2'
            }
          },
          {
            __typename: 'comment',
            id: '87f0c569-0cdd-43c8-b75f-9a16ca76aef0',
            author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
            author_profile: {
              __typename: 'profile',
              id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              first_name: 'Stathis',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:14.847+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
                  avatar: true,
                  file_name:
                    'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
                  width: 1151
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'Is everything ok?',
            created_at: '2022-03-22T18:35:13.314447+00:00',
            edited_at: null,

            parent_comment_id: '5fbbf473-6d84-424f-a6d0-113438037fc2',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '5fbbf473-6d84-424f-a6d0-113438037fc2'
            }
          },
          {
            __typename: 'comment',
            id: 'a9135114-b95b-4111-941b-181de27a5adf',
            author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
            author_profile: {
              __typename: 'profile',
              id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              first_name: 'Stathis',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:14.847+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
                  avatar: true,
                  file_name:
                    'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
                  width: 1151
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content: 'Do you get it??',
            created_at: '2022-03-22T18:37:16.416902+00:00',
            edited_at: null,

            parent_comment_id: '5fbbf473-6d84-424f-a6d0-113438037fc2',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '5fbbf473-6d84-424f-a6d0-113438037fc2'
            }
          },
          {
            __typename: 'comment',
            id: 'a2ca98e4-f718-4ef0-833f-d5b2029ce869',
            author_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
            author_profile: {
              __typename: 'profile',
              id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',
              first_name: 'Stathis',
              is_online: false,
              is_staff: false,
              latest_login: '2022-03-25T09:19:14.847+00:00',
              show_online_status: true,
              profile_images: [
                {
                  __typename: 'profile_image',
                  id: '8607c2ba-3466-42f5-b2c9-f3b47420c388',
                  avatar: true,
                  file_name:
                    'NAUfWB53YkjS_9BB02B6B-3929-4B59-9166-57A31DCF3C59.jpg',
                  height: 2048,
                  order: 0,
                  profile_id: 'o5Fn3gzBITh4XgfYi65iNxMJyUH2',

                  uri: 'https://i.pravatar.cc/150?u=a042581f4e290267043',
                  width: 1151
                }
              ]
            },
            comment_images: [],
            comment_liked: false,
            comment_likes_aggregate: {
              __typename: 'comment_like_aggregate',
              nodes: []
            },
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor lacus, lacinia eget cursus vitae, maximus ut felis. Vivamus maximus orci et erat dignissim, in interdum risus fringilla. Etiam cursus nisl sed nisl feugiat porta. Praesent et purus purus. Donec sagittis sit amet purus in ultricies. Ut eget diam sem. In finibus convallis ex, imperdiet maximus tortor tristique vitae. Aliquam erat volutpat. Praesent tincidunt elit vitae ligula tristique, at pretium turpis efficitur. Fusce porta blandit lacus, eu malesuada quam faucibus at. Proin sollicitudin nisi ut risus sagittis, accumsan pharetra lorem dignissim. Maecenas in dolor vitae dolor fermentum porta malesuada sit amet velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
              '\n' +
              'Sed vitae tortor condimentum, semper tortor eu, vehicula lacus. Integer nec egestas leo, vel lacinia odio. Curabitur sit amet dolor finibus turpis sodales feugiat vitae a ex. Donec vel nibh eu tortor tincidunt aliquam in non arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Pellentesque pellentesque elit nibh, et congue ipsum molestie sit amet. Pellentesque dictum, dui vitae consequat aliquam, lorem nibh efficitur tortor, a tincidunt sapien lectus id enim. Morbi feugiat odio ut elementum sagittis. Cras quis velit vel diam aliquam laoreet aliquam eget eros. Sed neque nunc, venenatis et dictum nec, suscipit id justo. Mauris purus quam, tempor malesuada lacus ut, consectetur sollicitudin nibh.\n' +
              '\n' +
              'Fusce fringilla tempor purus, sit amet rutrum mi gravida vitae. Nullam malesuada urna augue, non vehicula est convallis sit amet. Vivamus rutrum porta odio, a congue risus porta vel. Aenean efficitur dignissim accumsan. Suspendisse accumsan nibh dui, et aliquam felis vulputate et. Pellentesque sagittis ante turpis, id cursus lorem molestie nec. Aliquam sit amet neque in metus mollis convallis vehicula at velit.\n' +
              '\n' +
              'Mauris quis faucibus arcu. Vivamus maximus turpis quis est cursus fermentum. Cras auctor mi ac sem faucibus laoreet. Pellentesque eget ipsum a neque maximus cursus vitae ac nunc. Cras nunc erat, sagittis in accumsan at, euismod et ante. Suspendisse ex risus, sollicitudin nec hendrerit in, cursus ac nibh. Cras dictum eget leo vitae tristique. Nunc ut odio finibus, luctus neque at, dictum ante. Donec ante risus, iaculis ac nisi ut, semper tempor sem. Aliquam erat volutpat.\n' +
              '\n' +
              'Proin in suscipit tortor, vel semper ipsum. Aenean sit amet pretium sem, eget fermentum dolor. Etiam fringilla tristique nunc eget lobortis. Duis lacinia, sapien eget luctus lobortis, mauris mi ullamcorper lectus, varius tempor nunc velit quis purus. Proin erat tortor, ornare in ultrices ut, mollis a tortor. Proin sit amet arcu et arcu placerat sollicitudin vitae id tellus. Maecenas et purus ut elit molestie elementum in eget nisi. Suspendisse maximus non libero sed sodales.\n' +
              '\n' +
              'Mauris dignissim ut turpis et molestie. Nullam in massa fringilla, ultricies tortor nec, accumsan ante. Duis id ex eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed iaculis dignissim sem et suscipit. Donec eu nibh urna. Aenean vitae sem ligula. Vestibulum volutpat felis id augue tempor, eu sollicitudin urna lobortis. Fusce vel porttitor dui.\n' +
              '\n' +
              'Maecenas sed nulla urna. Nam porttitor ullamcorper mi, fermentum feugiat velit viverra sed. Vivamus volutpat nisl sed laoreet lacinia. Quisque accumsan dolor mi, at aliquet leo luctus vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas vehicula tempor efficitur. Phasellus nisl urna, vestibulum ultricies arcu at, venenatis efficitur ante. Vivamus augue enim, sagittis et neque non, bibendum fringilla dui. Sed tincidunt ipsum a eleifend laoreet.\n' +
              '\n' +
              'Nulla nulla elit, elementum vel urna quis, vulputate porttitor libero. Aliquam consequat dui vel libero dictum hendrerit. Fusce eu nulla hendrerit, porta ipsum venenatis, congue eros. Aenean dignissim eu erat tincidunt elementum. Nulla feugiat eros sed ex imperdiet sollicitudin. Proin dolor nulla, pretium ut imperdiet consequat, posuere eget felis. Donec posuere, enim nec convallis tincidunt, nisi magna ornare libero, eget volutpat eros nisl quis nunc. Nullam accumsan odio non felis rutrum, eu sollicitudin tortor rutrum. Fusce blandit sodales nisl ut ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce et libero in nunc suscipit pellentesque a eget nibh. Nulla dictum lectus quis commodo lacinia. Ut vestibulum ultrices consectetur. Curabitur at rutrum nisi, quis convallis sapien.\n' +
              '\n' +
              'Mauris eget mollis massa, quis rhoncus nibh. Aliquam dapibus fringilla sollicitudin. Sed maximus ex vel est commodo, lobortis euismod erat scelerisque. Morbi ornare commodo nisl, quis dignissim lorem gravida rhoncus. Praesent vel libero tincidunt, gravida ante vitae, feugiat lorem. Vivamus sit amet lectus non nisl lacinia finibus. Vestibulum imperdiet accumsan odio. Proin a est eu libero iaculis mattis. Vestibulum ut ultrices mi, non pharetra eros. Vestibulum sit amet sagittis leo, et dignissim odio.\n' +
              '\n' +
              'Suspendisse at nulla dui. Pellentesque eu elit condimentum, scelerisque sapien a, vestibulum mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam tristique eros erat, mollis sagittis mauris cursus hendrerit. Suspendisse potenti. Donec pulvinar nibh a dui interdum rhoncus. Nulla arcu augue, interdum ac diam ac, scelerisque finibus nisi. In consequat vestibulum dapibus. Nulla facilisi. Sed ac urna risus.\n' +
              '\n' +
              'In ut placerat risus. Donec eget laoreet mi. Nulla sed imperdiet leo, tincidunt vestibulum est. Integer in felis justo. Quisque consequat placerat eleifend. Phasellus suscipit sit amet mi at efficitur. Phasellus faucibus sollicitudin fringilla. Phasellus nulla nibh, tempus non orci sed, pharetra vestibulum lacus. Curabitur non placerat neque. Aenean interdum tortor eu imperdiet ultrices.\n' +
              '\n' +
              'Morbi ex velit, ultricies varius iaculis ut, efficitur at enim. Proin lectus urna, bibendum et metus ac, rhoncus imperdiet ligula. Suspendisse eget eros ornare, dictum enim eget, tincidunt ante. Nunc facilisis felis at mauris tempus, vel posuere lorem sollicitudin. Pellentesque tincidunt vulputate ultrices. Donec laoreet in nibh a feugiat. Maecenas dapibus sapien maximus magna porttitor, id imperdiet magna pretium. Aenean condimentum, leo vel luctus gravida, libero ligula consequat elit, ac mattis quam augue eu ex. Ut eu libero et nisl hendrerit pharetra. Phasellus fermentum ut odio at efficitur. Quisque nulla sem, mattis eu enim sit amet, placerat hendrerit sem. Nunc tempus vitae nisi id facilisis. Donec et malesuada sem. Nam tincidunt mi in dui dictum pretium. Duis ullamcorper et massa sit amet aliquam. Quisque sit amet tortor rhoncus, porta dolor non, commodo ex.\n' +
              '\n' +
              'Phasellus a lacus eget risus auctor congue. Vestibulum varius luctus augue. Proin interdum, risus condimentum tempus scelerisque, leo risus vehicula lacus, quis feugiat orci nunc eu tellus. Aliquam ut dui mi. Phasellus orci velit, viverra nec commodo sit amet, varius id libero. Aenean justo enim, ultrices ac eleifend quis, luctus at quam. Aenean facilisis mauris vitae commodo viverra. Mauris finibus purus eu erat lobortis tincidunt. Vestibulum dignissim quam sit amet placerat commodo.\n' +
              '\n' +
              'Donec tristique quis justo nec fringilla. Nullam pulvinar arcu et cursus gravida. Fusce fringilla quam ut quam ullamcorper, eu pretium mauris elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada commodo lorem in sollicitudin. Pellentesque suscipit gravida sagittis. Aenean vitae erat iaculis metus tristique tempus. Sed interdum nulla a est tincidunt lobortis. Mauris pellentesque eleifend dui, ut rutrum purus porta malesuada. Quisque non efficitur ligula. Aliquam id hendrerit felis.\n' +
              '\n' +
              'Integer a commodo felis, a ullamcorper dolor. Sed id bibendum purus, eu imperdiet justo. Mauris in mi massa. Curabitur non velit mi. Mauris massa ex, fringilla viverra sem nec, tincidunt semper purus. Nulla semper risus nec sapien placerat blandit a sit amet nibh. Sed mi lacus, fermentum sed erat ac, dictum imperdiet nisi.\n' +
              '\n' +
              'Aliquam pulvinar dignissim mi, id fermentum ligula efficitur non. Donec sagittis viverra convallis. Ut bibendum libero non congue fringilla. Etiam vulputate, nulla et efficitur fringilla, turpis eros tincidunt nisl, facilisis pellentesque lacus elit id orci. Vestibulum pretium augue eget tellus pharetra eleifend. Proin vestibulum, leo quis sagittis sodales, nunc nunc mattis sapien, vel venenatis neque mi eget quam. Duis facilisis est in sollicitudin suscipit. Donec non nulla at velit lobortis fringilla at et augue. Sed ligula enim, imperdiet vel sem eget, auctor sollicitudin erat. Aliquam tincidunt, odio quis luctus euismod, eros felis ullamcorper felis, nec malesuada dui turpis quis nulla. Aenean commodo diam mollis nisi varius dapibus. Fusce id tellus interdum, sollicitudin purus a, viverra sapien. Cras ipsum velit, efficitur varius tortor a, dignissim accumsan quam. Integer in eros quis metus mollis ultrices non sed magna. Suspendisse commodo ex in nisi consequat mollis.\n' +
              '\n' +
              'Ut tempor libero egestas imperdiet eleifend. Etiam volutpat neque vitae leo sollicitudin varius. Vivamus laoreet in velit id ornare. Praesent non odio ante. Quisque ut commodo mi. Aenean euismod nisi at quam ullamcorper efficitur. Quisque nec sapien ante. Quisque at risus dapibus, sodales augue id, dapibus est. Quisque commodo est nec nulla gravida dignissim. Sed cursus urna justo, ut sagittis arcu pharetra vitae. Vestibulum posuere dui nec ullamcorper luctus. Mauris interdum neque tortor, id viverra mauris rutrum vel. Ut accumsan efficitur urna, ut sollicitudin est ullamcorper nec. Sed dictum pulvinar magna sed mattis. Donec sed elementum sapien, in mattis tortor. Etiam bibendum ex ac metus sodales tempor.\n' +
              '\n' +
              'Etiam tincidunt, orci ac sagittis hendrerit, diam tortor eleifend dolor, quis sollicitudin metus enim a eros. Donec laoreet turpis in leo consequat porttitor. Mauris faucibus dictum dolor, at varius augue malesuada at. Suspendisse vehicula lacus felis, ut viverra eros scelerisque in. Vestibulum vitae leo nec nibh blandit auctor vel sit amet lorem. Suspendisse ac congue purus, eget molestie ante. Maecenas imperdiet nibh ut pharetra rutrum. Aliquam ligula orci, volutpat a egestas eget, finibus sed purus. Donec vitae lobortis eros, sit amet porttitor mauris. Suspendisse placerat diam vestibulum varius vehicula. Proin ultrices egestas interdum. Etiam orci orci, dapibus ac ullamcorper at, faucibus ac ex. Nulla ac libero efficitur urna porta pellentesque in in lectus. Morbi vehicula convallis efficitur. Mauris viverra dui tempor, rhoncus arcu non, dictum enim.\n' +
              '\n' +
              'Sed et tempor risus. Aliquam erat volutpat. Maecenas vel lacus at lacus tincidunt scelerisque et a sem. Vivamus efficitur hendrerit elit sit amet luctus. Nunc vel tincidunt sem, in volutpat augue. Fusce vitae ex sed magna euismod tristique porta eu metus. Nulla facilisi. Integer iaculis, dolor eu venenatis mollis, dui leo pretium mauris, vel pretium nibh tellus at lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed et lacinia magna. Ut in ligula eu sapien volutpat euismod quis ut velit. Aenean vel purus et tortor imperdiet lacinia. Ut quam justo, ornare et dictum a, facilisis maximus felis.',
            created_at: '2022-03-25T10:50:34.008464+00:00',
            edited_at: null,

            parent_comment_id: '5fbbf473-6d84-424f-a6d0-113438037fc2',
            post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
            total_comment_likes: 0,
            post: {
              __typename: 'post',
              id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
            },
            parent_comment: {
              __typename: 'comment',
              id: '5fbbf473-6d84-424f-a6d0-113438037fc2'
            }
          }
        ]
      },
      {
        __typename: 'comment',
        id: 'e5da5974-3161-4d86-84e7-df662042bff6',
        author_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
        author_profile: {
          __typename: 'profile',
          id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
          first_name: 'Team Four',
          is_online: false,
          is_staff: false,
          latest_login: '2022-03-25T09:19:16.806+00:00',
          show_online_status: true,
          profile_images: [
            {
              __typename: 'profile_image',
              id: 'e0b577b4-6656-4dee-87c1-0005b4c7049c',
              avatar: true,
              file_name:
                'eqYoHHDkPjwr_88EE2A5F-E08C-457D-9F41-2C27A867EF5A.jpg',
              height: 2048,
              order: 0,
              profile_id: 'ElklOiioEjfcCH1COD7afU0zFOP2',
              uri: 'https://i.pravatar.cc/150?u=a042581f4e290267022',
              width: 1154
            }
          ]
        },
        comment_images: [],
        comment_liked: false,
        comment_likes_aggregate: {
          __typename: 'comment_like_aggregate',
          nodes: []
        },
        content: 'Last comment!',
        created_at: '2022-03-24T12:56:18.64358+00:00',
        edited_at: null,

        parent_comment_id: 'ba1ff72d-d0d7-4f0e-b9fa-fbd9c8c1901c',
        post_id: '5846ee7d-6f12-481d-86a0-1df26a350de1',
        total_comment_likes: 0,
        post: {
          __typename: 'post',
          id: '5846ee7d-6f12-481d-86a0-1df26a350de1'
        },
        parent_comment: {
          __typename: 'comment',
          id: 'ba1ff72d-d0d7-4f0e-b9fa-fbd9c8c1901c'
        },
        child_comments: []
      }
    ]
  }
];

import useApi, { UseApiForm, UseApiQuery } from './../useApi';

const useFriendApi = () => {
  const { get, post, del } = useApi();

  const follow = {
    queryKey: ['follow'],
    process: async (userId: string) => post(`/v1/friends/follow/${userId}`),
  };

  const unfollow = {
    queryKey: ['unfollow'],
    process: async (userId: string) => del(`/v1/friends/unfollow/${userId}`),
  };

  //   const getMyPosts: UseApiQuery = {
  //     queryKey: ['myPosts'],
  //     process: async () => {
  //       if (!lastMyPostId) return get('/v1/me/posts');
  //       return get(`/v1/me/posts/${lastMyPostId}`);
  //     },
  //     onSuccess: (data: PostType[]) => setMyPosts(data),
  //   };

  //   const getUserPosts: UseApiQuery = {
  //     queryKey: ['userPosts'],
  //     process: async (userId: string) => get(`/v1/users/${userId}/posts`),
  //     onSuccess: () => null,
  //   };

  //   const getMyFeed = {
  //     queryKey: ['myFeed'],
  //     process: async () => get('/v1/feed'),
  //     onSuccess: (data: PostType[]) => setPosts(data),
  //     down: {
  //       queryKey: ['myFeedDown'],
  //       process: async () => get(`/v1/feed/down/${lastPostId}`),
  //       onSuccess: (data: PostType[]) => addPostsToBottom(data),
  //     },
  //   } as UseApiQuery & { down: UseApiQuery };

  //   const createPost: UseApiForm<PostForm> = {
  //     process: async (rawData) => {
  //       const data = {
  //         ...rawData,
  //         finishedAt: moment().add(rawData.finishedAt, 'minutes').toDate(),
  //       };
  //       return post('/v1/posts', data);
  //     },
  //     onSuccess: (data: PostType) => {
  //       addPostToTop(data);
  //       setMyPosts([data]);
  //       router.back();
  //     },
  //     onError: ({ response }) => {
  //       // TODO: Handle other errors
  //       console.log('error', response.data);
  //     },
  //   };

  //   const likePostApi = {
  //     queryKey: ['likePost'],
  //     process: async (postId: string) => post(`/v1/posts/${postId}/likes`),
  //   };

  //   const unlikePostApi = {
  //     queryKey: ['unlikePost'],
  //     process: async (postId: string) => del(`/v1/posts/${postId}/likes`),
  //   };

  //   const upVotePostApi = {
  //     queryKey: ['upVotePost'],
  //     process: async (postId: string) =>  post(`/v1/posts/${postId}/upvotes`),
  //   };

  //   const unUpVotePostApi = {
  //     queryKey: ['unUpVotePost'],
  //     process: async (postId: string) => del(`/v1/posts/${postId}/upvotes`),
  //   };

  //   const getComments = {
  //     queryKey: ['comments'],
  //     process: async (postId: string) => get(`/v1/posts/${postId}/comments`),
  //   };

  //   const createComment: UseApiForm<CommentForm> = {
  //     process: async (rawData) => {
  //       const data = {
  //         ...rawData,
  //       };
  //       return post('/v1/posts/' + data.postId + '/comments', data);
  //     },
  //     onSuccess: (data: PostType) => {
  //       setMyPosts([data]);
  //       addComment(data);
  //     },
  //     onError: ({ response }) => {
  //       console.log('error', response.data);
  //     },
  //   };
  return {
    follow,
    unfollow,
  };
};

export default useFriendApi;

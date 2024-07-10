import { CommentForm, PostForm, PostType } from '@/constants/types';
import useApi, { UseApiForm, UseApiQuery } from './../useApi';
import moment from 'moment';
import usePostsStore from '../../store/usePostsStore';
import { router } from 'expo-router';

const usePostsApi = () => {
  const { get, post, del } = useApi();

  const {
    setMyPosts,
    setPosts,
    addPostToTop,
    addPostsToBottom,
    lastPostId,
    lastMyPostId,
    likePost,
    upVotePost,
  } = usePostsStore();

  type ApiActionResponse = {
    postId: string;
    response: any; // Vous pouvez remplacer 'any' par un type plus spécifique selon la réponse de votre API
  };

  type ApiActionError = {
    response: any;
  };

  const getMyPosts: UseApiQuery = {
    queryKey: ['myPosts'],
    process: async () => {
      if (!lastMyPostId) return get('/v1/me/posts');
      return get(`/v1/me/posts/${lastMyPostId}`);
    },
    onSuccess: (data: PostType[]) => setMyPosts(data),
  };

  const getUserPosts: UseApiQuery = {
    queryKey: ['userPosts'],
    process: async (userId: string) => get(`/v1/users/${userId}/posts`),
    onSuccess: () => null,
  };

  const getMyFeed = {
    queryKey: ['myFeed'],
    process: async () => get('/v1/feed'),
    onSuccess: (data: PostType[]) => setPosts(data),
    down: {
      queryKey: ['myFeedDown'],
      process: async () => get(`/v1/feed/down/${lastPostId}`),
      onSuccess: (data: PostType[]) => addPostsToBottom(data),
    },
  } as UseApiQuery & { down: UseApiQuery };

  const createPost: UseApiForm<PostForm> = {
    process: async (rawData) => {
      const data = {
        ...rawData,
        finishedAt: moment().add(rawData.finishedAt, 'minutes').toDate(),
      };
      return post('/v1/posts', data);
    },
    onSuccess: (data: PostType) => {
      addPostToTop(data);
      setMyPosts([data]);
      router.back();
    },
    onError: ({ response }) => {
      // TODO: Handle other errors
      console.log('error', response.data);
    },
  };

  const likePostApi = {
    queryKey: ['likePost'],
    process: async (postId: string) => {
      const response = await post(`/v1/posts/${postId}/likes`);
      return { postId, response };
    },
    onSuccess: ({ postId }: ApiActionResponse) => likePost(postId),
    onerror: ({ response }: ApiActionError) => {
      console.log('error', response.data);
    },
  };

  const unlikePostApi = {
    queryKey: ['unlikePost'],
    process: async (postId: string) => {
      const response = await del(`/v1/posts/${postId}/likes`);
      return { postId, response };
    },
    onSuccess: ({ postId }: ApiActionResponse) => likePost(postId),
    onerror: ({ response }: ApiActionError) => {
      console.log('error', response.data);
    },
  };

  const upVotePostApi = {
    process: async (postId: string) => {
      const response = await post(`/v1/posts/${postId}/upvotes`);
      return { postId, response };
    },
    onSuccess: ({ postId }: ApiActionResponse) => upVotePost(postId),
    onerror: ({ response }: ApiActionError) => {
      console.log('error', response.data);
    },
  };

  const unUpVotePostApi = {
    process: async (postId: string) => {
      const response = await del(`/v1/posts/${postId}/upvotes`);
      return { postId, response };
    },
    onSuccess: ({ postId }: ApiActionResponse) => upVotePost(postId),
    onerror: ({ response }: ApiActionError) => {
      console.log('error', response.data);
    },
  };

  const getComments = {
    queryKey: ['comments'],
    process: async (postId: string) => get(`/v1/posts/${postId}/comments`),
  };

  const createComment: UseApiForm<CommentForm> = {
    process: async (rawData) => {
      const data = {
        ...rawData,
      };
      return post('/v1/posts/' + data.postId + '/comments', data);
    },
    onSuccess: (data: PostType) => {
      setMyPosts([data]);
    },
    onError: ({ response }) => {
      console.log('error', response.data);
    },
  };
  return {
    getMyPosts,
    getUserPosts,
    getMyFeed,
    createPost,
    likePostApi,
    unlikePostApi,
    upVotePostApi,
    unUpVotePostApi,
    getComments,
    createComment,
  };
};

export default usePostsApi;

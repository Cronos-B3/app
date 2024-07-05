import { PostForm, PostType } from '@/constants/types';
import useApi, { UseApiForm, UseApiQuery } from './../useApi';
import moment from 'moment';
import usePostsStore from '../../store/usePostsStore';

const usePostsApi = () => {
  const { get, post } = useApi();

  const { setMyPosts, setPosts, addPostsToBottom, lastPostId, lastMyPostId } = usePostsStore();

  const getMyPosts: UseApiQuery = {
    queryKey: ['myPosts'],
    process: async () => {
      if (!lastMyPostId) return get('/v1/me/posts');
      return get(`/v1/me/posts/${lastMyPostId}`);
    },
    onSuccess: (data: PostType[]) => setMyPosts(data),
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
      setMyPosts([data]);
    },
    onError: ({ response }) => {
      // TODO: Handle other errors
      console.log('error', response.data);
    },
  };

  return { getMyPosts, getMyFeed, createPost };
};

export default usePostsApi;

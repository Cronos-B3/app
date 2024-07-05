import { ChangePasswordForm, MyUserType, PostForm, PostType } from '@/constants/types';
import useApi, { UseApiForm, UseApiQuery } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import useUserStore from '../store/useUserStore';
import moment from 'moment';
import usePostsStore from '../store/usePostsStore';
import { AxiosError } from 'axios';
import useTokenStore from '../store/useTokenStore';
import { router } from 'expo-router';
import { AUTHR } from '@/constants/routes';

const useAppApi = () => {
  const { get, post } = useApi();

  const { t } = useTranslation('form');
  const { setUser } = useUserStore();
  const { removeToken } = useTokenStore();
  const {
    setMyPosts,
    setPosts,
    addPostsToTop,
    addPostsToBottom,
    firstPostId,
    lastPostId,
    lastMyPostId,
  } = usePostsStore();
  const toast = useToastController();

  const getMe: UseApiQuery = {
    queryKey: ['me'],
    process: async () => get('/v1/me'),
    onSuccess: (data: MyUserType) => setUser(data),
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (error.status === 401) {
        removeToken();
        router.push(AUTHR.login);
      }
    },
  };

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
    up: {
      queryKey: ['myFeedUp'],
      process: async () => get(`/v1/feed/up/${firstPostId}`),
      onSuccess: (data: PostType[]) => addPostsToTop(data),
    },
    down: {
      queryKey: ['myFeedDown'],
      process: async () => get(`/v1/feed/down/${lastPostId}`),
      onSuccess: (data: PostType[]) => addPostsToBottom(data),
    },
  } as UseApiQuery & { up: UseApiQuery; down: UseApiQuery };

  const changePassword: UseApiForm<ChangePasswordForm> = {
    process: async (data) => post('', data),
    onSuccess: (data) => {
      // TODO: Handle success
      console.log('success', data);
    },
    onError: (error) => {
      // TODO: Handle other errors
      console.log('error', error);
    },
    onFormError: (error, doKeysError) => {
      if (error.password?.type === 'required') {
        toast.show(t('error.password.required'));
        return;
      }

      if (!doKeysError(error)) return;

      if (error.password && error.password?.type !== 'required') {
        toast.show(t('error.password.incorrect'));
        return;
      }
    },
  };

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

  return { getMe, getMyPosts, getMyFeed, changePassword, createPost };
};

export default useAppApi;

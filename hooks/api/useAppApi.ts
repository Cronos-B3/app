import { ChangePasswordForm, MyUserType, PostForm, PostType } from '@/constants/types';
import useApi, { UseApiProcess, UseApiQuery } from './useApi';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import useUserStore from '../store/useUserStore';
import moment from 'moment';
import usePostsStore from '../store/usePostsStore';

const useAppApi = () => {
  const { get, post } = useApi();

  const { t } = useTranslation('form');
  const { setUser } = useUserStore();
  const { setMyPosts } = usePostsStore();
  const toast = useToastController();

  const getMe: UseApiQuery = {
    process: async () => get('/v1/me'),
    onSuccess: (data: MyUserType) => setUser(data),
  };

  const getMyPosts: UseApiQuery = {
    process: async () => get('/v1/me/posts'),
    onSuccess: (data: PostType[]) => setMyPosts(data),
  };

  const getMyFeed: UseApiQuery = {
    process: async () => get('/v1/posts/feed'),
    onSuccess: (data) => {
      console.log('success', data);
    },
  };

  const changePassword: UseApiProcess<ChangePasswordForm> = {
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

  const createPost: UseApiProcess<PostForm> = {
    process: async (rawData) => {
      const data = {
        ...rawData,
        finishedAt: moment().add(rawData.finishedAt, 'minutes').toDate(),
      };
      return post('/v1/posts', data);
    },
    onSuccess: (data) => {
      // TODO: Handle success
      console.log('success', data);
    },
    onError: ({ response }) => {
      // TODO: Handle other errors
      console.log('error', response.data);
    },
  };

  return { getMe, getMyPosts, getMyFeed, changePassword, createPost };
};

export default useAppApi;

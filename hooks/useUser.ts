import convertUser from 'lib/convertDataDB/convertUser';
import { useTokenStore } from './store/useTokenStore';
import { useUserStore } from './store/useUserStore';
import { useAPI } from './useAPI';
import { v1 } from 'lib/api/backendRoutes';
import { router } from 'expo-router';

const useUser = () => {
  const { token, removeToken } = useTokenStore();
  const { setUser, logout } = useUserStore();
  const { call } = useAPI();

  const loadUser = async () => {
    if (!token) return;
    const { users } = await call(v1.users.get({ token }));
    setUser(convertUser(users));
  };

  const logoutUser = () => {
    logout();
    removeToken();
    router.replace('/a/login');
  };

  return { loadUser, logoutUser };
};

export default useUser;

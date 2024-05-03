import convertUser from 'lib/convertDataDB/convertUser';
import { useTokenStore } from './store/useTokenStore';
import { useUserStore } from './store/useUserStore';
import { useAPI } from './useAPI';
import { v1 } from 'lib/api/backendRoutes';
import { router } from 'expo-router';
import { useCronStore } from './store/useCronStore';
import { convertCrons } from 'lib/convertDataDB/convertCron';

const useUser = () => {
  const { token, removeToken } = useTokenStore();
  const { setUser, logout } = useUserStore();
  const { call } = useAPI();
  const { resetCrons, setCrons } = useCronStore();

  const loadUser = async () => {
    if (!token) return;
    const { users } = await call(v1.users.get({ token }));
    const { crons } = await call(v1.crons.get({ token }));

    setUser(convertUser(users));
    setCrons(convertCrons(crons));
  };

  const logoutUser = () => {
    logout();
    removeToken();
    resetCrons();
    router.replace('/a/login');
  };

  return { loadUser, logoutUser };
};

export default useUser;

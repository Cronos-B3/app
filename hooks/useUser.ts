import convertUser from 'lib/convertDataDB/convertUser';
import { useTokenStore } from './store/useTokenStore';
import { useUserStore } from './store/useUserStore';
import { useAPI } from './useAPI';
import { v1 } from 'lib/api/backendRoutes';
import useErrorHandling from './useErrorHandling';

const useUser = () => {
  const { token, removeToken } = useTokenStore();
  const { setUser, logout } = useUserStore();
  const { call } = useAPI();
  const { handleError } = useErrorHandling();

  const loadUser = async () => {
    if (!token) return true;
    try {
      const { users } = await call(v1.users.get({ token }));
      setUser(convertUser(users));
      return true;
    } catch (error) {
      const response = handleError(error, false);
      if (!response) return;

      switch (response.status) {
        case 401:
          logout();
          removeToken();
          break;

        default:
          break;
      }
    }
  };

  return { loadUser };
};

export default useUser;

import ProfileTemplate from 'components/templates/ProfileTemplate/ProfileTemplate';
import { Redirect } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { useUserStore } from 'hooks/store/useUserStore';
import { useAPI } from 'hooks/useAPI';
import { v1 } from 'lib/api/backendRoutes';
import convertUser from 'lib/convertDataDB/convertUser';
import { useEffect } from 'react';

export default () => {
  if (__DEV__) console.log('🏳️ - profile');

  const { token } = useTokenStore();
  const { user, setUser } = useUserStore();
  const { call } = useAPI();

  if (!token) return <Redirect href="/login" />;

  useEffect(() => {
    (async () => {
      if (__DEV__) console.log('🙌 - anonymous function');

      const { users } = await call(v1.users.get({ token }));

      setUser(convertUser(users));
    })();
  }, []);

  if (!user) return <></>;

  return <ProfileTemplate profile={user} />;
};

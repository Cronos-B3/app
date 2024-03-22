import ProfileTemplate from 'components/templates/ProfileTemplate/ProfileTemplate';
import { Redirect } from 'expo-router';
import { useUserStore } from 'hooks/store/useUserStore';

export default () => {
  if (__DEV__) console.log('🏳️ - profile');

  const { user } = useUserStore();

  if (!user) return <Redirect href={'/a/login'} />;

  return <ProfileTemplate profile={user} />;
};

import useUserStore from '@/hooks/store/useUserStore';
import ProfileTemplate from '../templates/ProfileTemplate';

export default function MyProfilePage() {
  if (__DEV__) console.log('📃 - MyProfilePage');

  const { user } = useUserStore();

  return <ProfileTemplate user={user} me />;
}

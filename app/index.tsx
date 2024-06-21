import { APPR, AUTHR } from '@/constants/routes';
import useTokenStore from '@/hooks/store/useTokenStore';
import { Redirect } from 'expo-router';

export default function LandPage() {
  const { token } = useTokenStore();

  if (token) return <Redirect href={APPR.home} />;

  return <Redirect href={AUTHR.login} />;
}

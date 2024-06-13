import { APPR, AUTHR } from '@/constants/routes';
import { Redirect } from 'expo-router';

export default function LandPage() {
  // if (connected) return <Redirect href={home} />

  return <Redirect href={AUTHR.login} />;
}

import { router, useLocalSearchParams } from 'expo-router';
import ProfileTemplate from '../templates/ProfileTemplate';
import { useEffect, useState } from 'react';
import { UserType } from '@/constants/types';
import { APPR } from '@/constants/routes';
import { useQuery } from '@tanstack/react-query';
import usePostsApi from '@/hooks/api/app/usePostApi';
import useAppApi from '@/hooks/api/useAppApi';

export default function PublicProfilePage() {
  if (__DEV__) console.log('📃 - PublicProfilePage');

  const [user, setUser] = useState<UserType | null>(() => null);
  const { id } = useLocalSearchParams();

  const { getUser } = useAppApi();

  const { data } = useQuery({
    queryKey: [...getUser.queryKey, id],
    queryFn: () => getUser.process(id),
  });

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [data]);

  if (user === null) return;

  return <ProfileTemplate user={user} />;
}

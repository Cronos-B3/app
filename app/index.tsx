import React from 'react';
import { Redirect } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  return <Redirect href="/a/register/public-data" />;

  if (token) return <Redirect href="/a/home" />;

  return <Redirect href="/a/login" />;
};

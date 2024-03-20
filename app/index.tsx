import React from 'react';
import { Redirect } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  if (token) return <Redirect href="/a/home" />;

  return <Redirect href="/login" />;
};

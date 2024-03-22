import React from 'react';
import { StatusBar as StatusBarExpo, StatusBarStyle } from 'expo-status-bar';
import { useTheme } from 'contexts/ThemeContext';

const StatusBar = ({ style }: { style?: StatusBarStyle }) => {
  if (__DEV__) console.log('🐙 - StatusBar');

  const { colors } = useTheme();

  return <StatusBarExpo style={style ?? (colors.status_bar as StatusBarStyle)} />;
};

export default StatusBar;

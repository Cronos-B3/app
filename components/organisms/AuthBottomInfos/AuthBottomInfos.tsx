import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import LinkText from 'components/atoms/BaseText/LinkText';
import { useTranslation } from 'react-i18next';

const AuthBottomInfos = ({ style, ...rest }: ViewProps) => {
  if (__DEV__) console.log('🐙 - AuthBottomInfos');

  const { t } = useTranslation('policy');

  return (
    <View style={[s.container, style]} {...rest}>
      <LinkText style={s.textConditions}>{t('terms')}</LinkText>
      <LinkText style={s.textConditions}>{t('privacy')}</LinkText>
    </View>
  );
};

export default AuthBottomInfos;

const s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    opacity: 0.6
  },
  textConditions: {
    fontSize: 12,
    textDecorationLine: 'underline'
  }
});

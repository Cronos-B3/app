import LinkText from 'components/atoms/BaseText/LinkText';
import Text from 'components/atoms/BaseText/Text';
import CheckBox from 'components/molecules/CheckBox/CheckBox';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import { DEVICE } from 'constants/config';
import { as, gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export default () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      old_enough: false,
      terms: false,
      privacy: false
    }
  });

  return (
    <View style={as.container}>
      <Controller
        control={control}
        name="old_enough"
        rules={{ required: true }}
        render={({ field: { value, onChange, name } }) => (
          <View style={s.checkContainer}>
            <View style={s.checkBoxContainer}>
              <CheckBox setCheck={onChange} check={value} style={s.checkBox} />
            </View>
            <Text style={s.text}>{t(`auth:${name}`)}</Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="terms"
        rules={{ required: true }}
        render={({ field: { value, onChange, name } }) => (
          <View style={s.checkContainer}>
            <View style={s.checkBoxContainer}>
              <CheckBox setCheck={onChange} check={value} style={s.checkBox} />
            </View>
            <Text style={s.text}>
              <Trans
                i18nKey={`auth:${name}`}
                components={{
                  bold: <LinkText noDefaultStyle font="bold" style={s.underline} />
                }}
              />
            </Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="privacy"
        rules={{ required: true }}
        render={({ field: { value, onChange, name } }) => (
          <View style={s.checkContainer}>
            <View style={s.checkBoxContainer}>
              <CheckBox setCheck={onChange} check={value} style={s.checkBox} />
            </View>
            <Text style={s.text}>
              <Trans
                i18nKey={`auth:${name}`}
                components={{
                  bold: <LinkText noDefaultStyle font="bold" style={s.underline} />
                }}
              />
            </Text>
          </View>
        )}
      />
      <LoadingButton
        style={[gs.button, { backgroundColor: colors.secondary }]}
        onPress={handleSubmit(() => router.push('/a/register/private-data'))}
      >
        {t('next')}
      </LoadingButton>
    </View>
  );
};

const s = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    paddingHorizontal: '10%',
    gap: 12
  },
  checkBoxContainer: {
    height: DEVICE.height * 0.04,
    aspectRatio: 1
  },
  checkBox: { borderRadius: 6 },
  text: {
    marginTop: '1.25%',
    fontSize: 16
  },
  underline: { textDecorationLine: 'underline' }
});

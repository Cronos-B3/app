import Text from 'components/atoms/BaseText/Text';
import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import Input from 'components/molecules/Input/Input';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import { DEVICE } from 'constants/config';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { useCronStore } from 'hooks/store/useCronStore';
import { useUserStore } from 'hooks/store/useUserStore';
import { useAPI } from 'hooks/useAPI';
import useErrorHandling from 'hooks/useErrorHandling';
import { t } from 'i18next';
import { v1 } from 'lib/api/backendRoutes';
import convertCron from 'lib/convertDataDB/convertCron';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type CreatePostProps = {
  text: string;
  end_at: string;
};

export default () => {
  if (__DEV__) console.log('🏳️  - create-post');

  const { colors } = useTheme();
  const { user } = useUserStore();
  const { call, loading } = useAPI();
  const { handleError } = useErrorHandling();
  const { addCronsToTop } = useCronStore();

  const { control, handleSubmit } = useForm<CreatePostProps>({
    defaultValues: {
      text: '',
      end_at: '1440'
    }
  });

  const request = async ({ text, end_at }: CreatePostProps) => {
    try {
      const { cron } = await call(
        v1.crons.post({
          text,
          end_at: moment().add(end_at, 'minutes').utc().format('YYYY-MM-DD HH:mm:ss')
        })
      );

      addCronsToTop([convertCron(cron)]);
      router.navigate('/a/home');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ModalTemplate style={s.container}>
      <View style={s.headerContainer}>
        <Pressable
          pressedOpacity={1}
          style={[
            s.buttons,
            {
              width: '33%',
              backgroundColor: colors.secondary
            }
          ]}
        >
          <Text style={s.text}>{t('general')}</Text>
        </Pressable>
      </View>
      <View style={s.contentContainer}>
        <View style={s.imageContainer}>
          <Image source={user?.profile_picture} style={s.image} />
        </View>
        <View style={s.inputContainer}>
          <Controller
            control={control}
            name="text"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <View style={s.inputLengthContainer}>
                  <Text>{value.length} / 240</Text>
                </View>
                <Input
                  multiline
                  textInputStyle={[s.text, { textAlignVertical: 'top' }]}
                  maxLength={240}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t('catchphrase')}
                />
              </>
            )}
          />
        </View>
      </View>
      <View style={s.bottomContainer}>
        <View
          style={[
            {
              height: '100%',
              width: '40%',
              backgroundColor: colors.secondary,
              borderRadius: 99,
              paddingHorizontal: '5%'
            }
          ]}
        >
          <Controller
            control={control}
            name="end_at"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                mode="default"
                dropdownPosition="top"
                labelField="label"
                valueField="value"
                data={[
                  { label: '1min', value: '1' },
                  { label: '5min', value: '5' },
                  { label: '30min', value: '30' },
                  { label: '1h', value: '60' },
                  { label: '3h', value: '180' },
                  { label: '6h', value: '360' },
                  { label: '12h', value: '720' },
                  { label: '1 jour', value: '1440' }
                  // { label: 'Personnaliser', value: 'custom' }
                ]}
                onChange={({ value }) => onChange(value)}
                value={value}
                selectedTextStyle={{ color: colors.light }}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          />
        </View>
        <LoadingButton
          loading={loading}
          style={[
            s.buttons,
            {
              width: '45%',
              backgroundColor: colors.secondary
            }
          ]}
          onPress={handleSubmit(request)}
        >
          {t('post')}
        </LoadingButton>
      </View>
    </ModalTemplate>
  );
};

const s = StyleSheet.create({
  container: {
    marginBottom: '2%',
    gap: DEVICE.height * 0.01
  },
  buttons: {
    height: '100%',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { fontSize: 16 },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    gap: DEVICE.width * 0.015
  },
  contentContainer: {
    flex: 6.5,
    flexDirection: 'row',
    gap: DEVICE.width * 0.03
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1
  },
  image: {
    flex: 1,
    borderRadius: 99
  },
  inputLengthContainer: {
    width: '100%',
    alignItems: 'flex-end'
  },
  inputContainer: {
    flex: 5
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

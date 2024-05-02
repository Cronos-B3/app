import Text from 'components/atoms/BaseText/Text';
import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import Input from 'components/molecules/Input/Input';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import { DEVICE } from 'constants/config';
import { useTheme } from 'contexts/ThemeContext';
import { useUserStore } from 'hooks/store/useUserStore';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️  - create-post');

  const { colors } = useTheme();
  const { user } = useUserStore();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      text: ''
    }
  });

  const request = async (data: any) => {
    console.log(data);
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
                  textInputStyle={s.text}
                  maxLength={240}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
        </View>
      </View>
      <View style={s.bottomContainer}>
        <Pressable
          style={[
            s.buttons,
            {
              width: '45%',
              backgroundColor: colors.secondary
            }
          ]}
          onPress={handleSubmit(request)}
        >
          <Text style={s.text}>{t('post')}</Text>
        </Pressable>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

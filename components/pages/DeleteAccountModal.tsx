import ReactNativeModal from 'react-native-modal';
import { YStack } from 'tamagui';
import LoadingButton from '../molecules/LoadingButton';
import Text from '../atoms/Text';
import { DEVICE } from '@/constants/config';
import { useTranslation } from 'react-i18next';

type DeleteAccountModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function DeleteAccountModal({ isVisible, onClose }: DeleteAccountModalProps) {
  if (__DEV__) console.log('📃 - DeleteAccountModal');

  const { t } = useTranslation('app');

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      backdropColor="black"
      style={{ justifyContent: 'center', alignItems: 'center' }}>
      <YStack
        gap={DEVICE.height * 0.035}
        paddingVertical={DEVICE.height * 0.035}
        width={'100%'}
        backgroundColor={'$modalBackground'}
        borderRadius={'$4'}
        paddingHorizontal={'5%'}
        justifyContent="space-evenly">
        <Text fontSize={'$5'} numberOfLines={undefined} textAlign="center">
          {t('deleteAccount.text')}
        </Text>
        <LoadingButton customSize="large" onPress={onClose}>
          {t('deleteAccount.cancel')}
        </LoadingButton>
        <LoadingButton customSize="large" red fontFamily={'$bold'}>
          {t('deleteAccount.confirm')}
        </LoadingButton>
      </YStack>
    </ReactNativeModal>
  );
}

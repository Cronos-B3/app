import { LeftArrow } from 'assets/svg/Arrow';
import Text from 'components/atoms/BaseText/Text';
import Pressable from 'components/atoms/Pressable/Pressable';
import { DEVICE } from 'constants/config';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { ReactNode, useState } from 'react';
import { DimensionValue, StyleSheet, View, ViewProps } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ModalTemplateProps = {
  children?: ReactNode;
  height?: DimensionValue;
  title?: string;
  style?: ViewProps['style'];
  onBack?: boolean;
};

const ModalTemplate = ({
  children,
  height = '50%',
  title,
  style,
  onBack = true
}: ModalTemplateProps) => {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  const [isVisible, setIsVisible] = useState(() => true);

  const onClose = () => setIsVisible(false);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={300}
      hasBackdrop={true}
      backdropColor="transparent"
      backdropOpacity={0}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      onModalHide={() => router.back()}
      style={s.modal}
    >
      <View
        style={[
          s.container,
          { height, paddingBottom: bottom, backgroundColor: colors.modal_background }
        ]}
      >
        <View style={s.contentContainer}>
          <View style={s.divider} />
          <Text style={s.text} font="bold" numberOfLines={1}>
            {title}
          </Text>
          <View style={[gs.flex, style]}>{children}</View>
          {onBack && (
            <Pressable style={s.leftArrow} onPress={onClose}>
              <LeftArrow color="white" />
            </Pressable>
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalTemplate;

const s = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  container: {
    paddingHorizontal: '6%',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27
  },
  contentContainer: {
    flex: 1,
    marginTop: '3%',
    marginBottom: '6%',
    gap: DEVICE.height * 0.02
  },
  divider: {
    height: 2,
    width: '20%',
    borderRadius: 99,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: '12%'
  },
  leftArrow: {
    position: 'absolute',
    top: DEVICE.height * 0.02 + 1,
    left: 0,
    width: '9%',
    aspectRatio: 1
  }
});

import { LeftArrow } from 'assets/svg/Arrow';
import Text from 'components/atoms/BaseText/Text';
import Pressable from 'components/atoms/Pressable/Pressable';
import ViewAdjustKeyboard from 'components/atoms/ViewAdjustKeyboard/ViewAdjustKeyboard';
import { DEVICE } from 'constants/config';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { DimensionValue, StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ModalTemplateProps = {
  children?: ReactNode;
  height?: DimensionValue;
  title?: string;
  style?: ViewProps['style'];
};

const ModalTemplate = ({ children, height = '50%', title, style }: ModalTemplateProps) => {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  const onClose = () => router.back();

  return (
    <Pressable style={[s.container, { height }]} pressedOpacity={1}>
      <ViewAdjustKeyboard>
        <View
          style={[
            s.contentContainer,
            { paddingBottom: bottom, backgroundColor: colors.modal_background }
          ]}
        >
          <View style={s.content}>
            <View style={s.divider} />
            <Text style={s.text} font="bold" numberOfLines={1}>
              {title}
            </Text>
            <View style={[gs.flex, style]}>{children}</View>
            <Pressable style={s.leftArrow} onPress={onClose}>
              <LeftArrow color="white" />
            </Pressable>
          </View>
        </View>
      </ViewAdjustKeyboard>
    </Pressable>
  );
};

export default ModalTemplate;

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: '6%',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27
  },
  content: {
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

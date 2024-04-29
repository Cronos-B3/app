import Text from 'components/atoms/BaseText/Text';
import Pressable from 'components/atoms/Pressable/Pressable';
import { DEVICE } from 'constants/config';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ModalTemplateProps = {
  children?: ReactNode;
  style?: ViewProps['style'];
  title?: string;
};

const ModalTemplate = ({ children, style, title }: ModalTemplateProps) => {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={gs.flex}>
      <Pressable style={gs.flex} onPress={() => router.back()} pressedOpacity={1} />
      <View
        style={[
          s.container,
          style,
          { paddingBottom: bottom, backgroundColor: colors.modal_background }
        ]}
      >
        <View style={s.contentContainer}>
          <View style={s.divider} />
          <Text style={s.text} font="bold">
            {title}
          </Text>
          {children}
        </View>
      </View>
    </View>
  );
};

export default ModalTemplate;

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '6%',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27
  },
  contentContainer: {
    flex: 1,
    marginVertical: '3%',
    gap: DEVICE.height * 0.01
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
    textAlign: 'center'
  }
});

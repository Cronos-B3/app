import { gs } from 'constants/styles';
import { ScrollView, ViewProps } from 'react-native';

const ViewAdjustKeyboard = ({ children, ...props }: ViewProps) => {
  if (__DEV__) console.log('🐙 - ViewAdjustKeyboard');

  return (
    <ScrollView {...props} contentContainerStyle={gs.flex} automaticallyAdjustKeyboardInsets>
      {children}
    </ScrollView>
  );
};

export default ViewAdjustKeyboard;

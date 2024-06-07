import { DEVICE } from '@/constants/config';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox, XStack, XStackProps } from 'tamagui';
import Text, { TextProps } from '../atoms/Text';

export type CheckboxWithLabelProps = TextProps & {
  containerProps?: Omit<XStackProps, 'children'>;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
};

const CheckboxWithLabel = Text.styleable<CheckboxWithLabelProps>(
  ({ children, containerProps, onCheckedChange, checked, ...props }, ref) => {
    return (
      <XStack gap={DEVICE.width * 0.05} {...containerProps}>
        {/* Theme warning isn't problematic */}
        <Checkbox
          size={'$9'}
          borderColor={'$inversed'}
          ref={ref}
          onCheckedChange={onCheckedChange}
          checked={checked}>
          <Checkbox.Indicator>
            <Check color={'$inversed'} size={'$3'} />
          </Checkbox.Indicator>
        </Checkbox>
        <Text numberOfLines={undefined} marginTop={DEVICE.height * 0.004} {...props}>
          {children}
        </Text>
      </XStack>
    );
  }
);

CheckboxWithLabel.displayName = 'CheckboxWithLabel';

export default CheckboxWithLabel;

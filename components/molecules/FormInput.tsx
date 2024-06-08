import { Button, GetProps, StackProps, styled, XStack, YStack } from 'tamagui';
import Input from '../atoms/Input';
import { DEVICE } from '@/constants/config';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import Text from '../atoms/Text';
import { useState } from 'react';

const FormInputFrame = styled(Input, {
  flex: 1,
  height: DEVICE.height * 0.04,
  borderWidth: 0,
  color: '$inversed',
  maxLength: 255,

  variants: {
    type: {
      identifier: {
        maxLength: 127,
        autoCapitalize: 'none',
      },
      password: {
        autoCapitalize: 'none',
      },
    },
  } as const,
});

export type FormInputProps = GetProps<typeof FormInputFrame> & {
  containerProps?: StackProps;
};

const FormInput = FormInputFrame.styleable<FormInputProps>(
  ({ type, containerProps, ...props }, ref) => {
    const { t } = useTranslation('form');

    const [hidden, setHidden] = useState(() => type === 'password');

    return (
      <YStack {...containerProps}>
        <Text color={'$inversed'}>{t(`${type}.label`)}</Text>
        <XStack
          alignItems="center"
          borderBottomWidth={1}
          borderColor={'$inversed75'}
          gap={6}
          paddingHorizontal={'1.5%'}>
          <FormInputFrame
            ref={ref}
            type={type}
            {...props}
            secureTextEntry={hidden}
            placeholder={t(`${type}.placeholder`)}
          />
          {type === 'password' && (
            <Button
              color="$inversed"
              icon={
                hidden ? (
                  <Eye strokeWidth={1.5} size={'$4'} />
                ) : (
                  <EyeOff strokeWidth={1.5} size={'$4'} />
                )
              }
              onPress={() => setHidden(!hidden)}
            />
          )}
        </XStack>
      </YStack>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;

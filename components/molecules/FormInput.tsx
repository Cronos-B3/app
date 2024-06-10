import { Button, GetProps, StackProps, styled, XStack, YStack } from 'tamagui';
import Input from '../atoms/Input';
import { DEVICE } from '@/constants/config';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import Text from '../atoms/Text';
import { ReactNode, useState } from 'react';

const FormInputFrame = styled(Input, {
  flex: 1,
  height: DEVICE.height * 0.04,
  borderWidth: 0,
  color: '$inversed',
  maxLength: 255,

  variants: {
    type: {
      id_or_email: {
        maxLength: 127,
      },
      password: {
        autoCapitalize: 'none',
      },
      password_confirmation: {
        autoCapitalize: 'none',
      },
      email: {
        maxLength: 127,
        autoCapitalize: 'none',
      },
      identifier: {
        maxLength: 63,
      },
      username: {
        maxLength: 63,
      },
    },
  } as const,
});

const INPUT_TO_HIDE = ['password', 'password_confirmation'];

export type FormInputProps = GetProps<typeof FormInputFrame> & {
  containerProps?: StackProps;
  subLabel?: ReactNode;
};

const FormInput = FormInputFrame.styleable<FormInputProps>(
  ({ type, containerProps, subLabel, ...props }, ref) => {
    const { t } = useTranslation('form');

    const inputType = type?.replace('_confirmation', '.confirmation');
    const isLabelHidden = !inputType?.includes('.confirmation');

    const isInputHidden = INPUT_TO_HIDE.includes(type ?? '');
    const [hidden, setHidden] = useState(() => isInputHidden);

    return (
      <YStack {...containerProps}>
        {isLabelHidden && <Text color={'$inversed'}>{t(`${type}.label`)}</Text>}
        {subLabel}
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
            placeholder={t(`${inputType}.placeholder`)}
          />
          {isInputHidden && (
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

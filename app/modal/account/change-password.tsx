import StyledPasswordInput from 'components/molecules/Input/StyledPasswordInput';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import RULES from 'constants/rules';
import { gs } from 'constants/styles';
import { useTheme } from 'contexts/ThemeContext';
import { useAPI } from 'hooks/useAPI';
import { t } from 'i18next';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️  - change-password');

  const refs = {
    ref1: useRef<TextInput>(null),
    ref2: useRef<TextInput>(null),
    ref3: useRef<TextInput>(null)
  };

  const { colors } = useTheme();
  const { call, loading } = useAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  });

  const request = async (data: any) => {};

  const newPassword = watch('new_password');

  return (
    <ModalTemplate
      title={t('settings:account.edit_password')}
      style={{ justifyContent: 'space-evenly' }}
    >
      <Controller
        control={control}
        name="old_password"
        rules={{ required: true }}
        render={({ field: { onChange, value, name } }) => (
          <StyledPasswordInput
            type={name}
            style={gs.inputContainer}
            error={errors[name]?.type}
            onChangeText={onChange}
            value={value}
            ref={refs.ref1}
            onSubmitEditing={() => refs.ref2?.current?.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="new_password"
        rules={{ required: true, ...RULES.password }}
        render={({ field: { onChange, value, name } }) => (
          <StyledPasswordInput
            type={name}
            style={gs.inputContainer}
            error={errors[name]?.type}
            onChangeText={onChange}
            value={value}
            ref={refs.ref2}
            onSubmitEditing={() => refs.ref3?.current?.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="new_password_confirmation"
        rules={{ required: true, validate: (value) => value === newPassword }}
        render={({ field: { onChange, value, name } }) => (
          <StyledPasswordInput
            type={name}
            style={gs.inputContainer}
            error={errors[name]?.type}
            onChangeText={onChange}
            value={value}
            ref={refs.ref3}
          />
        )}
      />
      <LoadingButton
        style={[gs.button, { backgroundColor: colors.secondary }]}
        onPress={handleSubmit(request)}
        loading={loading}
      >
        Confirm
      </LoadingButton>
    </ModalTemplate>
  );
};

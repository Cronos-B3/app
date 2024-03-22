import React, { useMemo, useState } from 'react';
import Text from 'components/atoms/BaseText/Text';
import { Button, StyleSheet, View } from 'react-native';
import AuthTemplate from 'components/templates/AuthTemplate/AuthTemplate';
import { useAPI } from 'hooks/useAPI';
import { useTheme } from 'contexts/ThemeContext';
import avoidKeyboard from 'lib/avoidKeyboard';
import LoadingButton from 'components/molecules/LoadingButton/LoadingButton';
import { router } from 'expo-router';
import { auth } from 'lib/api/backendRoutes';
import { useTokenStore } from 'hooks/store/useTokenStore';
import { Controller, useForm } from 'react-hook-form';
import StyledInput from 'components/molecules/Input/StyledInput';
import { AxiosError } from 'axios';
import { useToast } from 'react-native-toast-notifications';
import convertUser from 'lib/convertDataDB/convertUser';
import { useUserStore } from 'hooks/store/useUserStore';
import { gs } from 'constants/styles';

export default () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmationPassword: ''
    }
  });

  return <View style={gs.flex}></View>;
};

// export default () => {
//   if (__DEV__) console.log('🏳️ - register');
//   const keyboards = avoidKeyboard(4);
//   const { colors } = useTheme();
//   const { text } = useTranslate();
//   const { call, loading } = useAPI();
//   const toast = useToast();
//   const { setToken } = useTokenStore();
//   const { setUser } = useUserStore();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm({
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       confirmationPassword: ''
//     }
//   });

//   const password = watch('password');

//   const requestRegister = async (data: any) => {
//     if (__DEV__) console.log('🔐 - requestRegister');

//     const { username, email, password, confirmationPassword } = data;

//     try {
//       const { token, user } = await call(
//         auth.register.post({ username, email, password, confirmationPassword })
//       );

//       setToken(token);
//       setUser(convertUser(user));

//       router.push('/a/home');
//     } catch (error) {
//       if (!(error instanceof AxiosError)) {
//         toast.show('An error occurred', { type: 'danger' });
//         return;
//       }

//       const { data } = error.response?.data;

//       console.log('🔴 - requestRegister', data);
//       if (data['u_username']) control.setError('username', { type: 'not_unique' });
//       if (data['u_email']) control.setError('email', { type: 'not_unique' });
//     }
//   };

//   return (
//     <AuthTemplate keyboardOffset={keyboards.keyboardOffset}>
//       {/* <View style={{ height: '90%', justifyContent: 'space-evenly' }}> */}
//       <Controller
//         control={control}
//         name="username"
//         rules={{ required: true, ...RULES.username }}
//         render={({ field: { onChange, value, name } }) => (
//           <StyledInput
//             ref={keyboards['ref1']}
//             style={as.inputContainer}
//             error={errors[name]?.type}
//             type={name}
//             onChangeText={onChange}
//             onSubmitEditing={() => {
//               if (!keyboards['ref2']?.current) return;
//               keyboards['ref2']?.current.focus();
//             }}
//             value={value}
//             maxLength={63}
//           />
//         )}
//       />
//       <Controller
//         control={control}
//         name="email"
//         rules={{ required: true, ...RULES.email }}
//         render={({ field: { onChange, value, name } }) => (
//           <StyledInput
//             ref={keyboards['ref2']}
//             style={as.inputContainer}
//             error={errors[name]?.type}
//             type={name}
//             onChangeText={onChange}
//             value={value}
//             maxLength={127}
//           />
//         )}
//       />
//       <Controller
//         control={control}
//         name="password"
//         rules={{ required: true, ...RULES.password }}
//         render={({ field: { onChange, value, name } }) => (
//           <StyledInput
//             ref={keyboards['ref3']}
//             style={as.inputContainer}
//             error={errors[name]?.type}
//             type={name}
//             onChangeText={onChange}
//             value={value}
//             maxLength={63}
//           />
//         )}
//       />
//       <Controller
//         control={control}
//         name="confirmationPassword"
//         rules={{ validate: (value) => value === password }}
//         render={({ field: { onChange, value, name } }) => (
//           <StyledInput
//             ref={keyboards['ref4']}
//             style={as.inputContainer}
//             error={errors[name]?.type}
//             type={name}
//             onChangeText={onChange}
//             value={value}
//             maxLength={63}
//           />
//         )}
//       />
//       <LoadingButton
//         style={[as.button, { backgroundColor: colors.secondary }]}
//         loading={loading}
//         onPress={handleSubmit(requestRegister)}
//       >
//         <Text style={gs.buttonText}>{text.auth.register}</Text>
//       </LoadingButton>
//       {/* </View> */}
//     </AuthTemplate>
//   );
// };

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
});

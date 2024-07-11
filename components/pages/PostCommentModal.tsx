import { DEVICE } from '@/constants/config';
import LoadingButton from '../molecules/LoadingButton';
import ModalTemplate from '../templates/ModalTemplate';
import { Image, TextArea, useTheme, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import useForm from '@/hooks/useForm';
import { CommentForm, PostForm } from '@/constants/types';
import { useMutation } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import usePostsApi from '@/hooks/api/app/usePostApi';
import { useRoute } from '@react-navigation/native';
import useAuthApi from '@/hooks/api/useAuthApi';
import useUserStore from '@/hooks/store/useUserStore';
import { Router } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

export default function PostCommentModal() {
  if (__DEV__) console.log('📃 - PostCommentModal');

  const { t } = useTranslation();
  const { user } = useUserStore();
  const { createComment } = usePostsApi();
  const [keyboardHeight, setKeyboardHeight] = useState(() => 0);
  const theme = useTheme();

  const route = useRoute();
  const { id } = route.params as { id: string };
  if (__DEV__) console.log('🆔 id', id);

  const { mutate: fetchCreateComment, isPending } = useMutation({
    mutationFn: createComment.process,
    onSuccess: () => {
      router.back();
      createComment.onSuccess;
    },
    onError: createComment.onError,
  });

  const { control, onSubmit, isFormPending } = useForm<CommentForm>({
    defaultValues: {
      content: '',
      postId: id,
    },
    onSuccess: fetchCreateComment,
    keysError: ['content'],
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ModalTemplate height={70} topPadding>
      <LoadingButton
        position="absolute"
        right={0}
        top={DEVICE.height * 0.0275}
        aspectRatio={4}
        customSize="small"
        borderRadius={'$round'}
        isLoading={isPending || isFormPending}
        onPress={() => {
          Keyboard.dismiss();
          onSubmit();
        }}>
        Commenter
      </LoadingButton>
      <XStack flex={1} gap={DEVICE.width * 0.025}>
        <Image
          width={'15%'}
          aspectRatio={1}
          borderRadius={'$round'}
          source={{
            uri: user?.profilePicture,
          }}
        />

        <Controller
          control={control}
          name="content"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextArea
              marginTop={DEVICE.width * 0.04}
              flex={1}
              textAlignVertical="top"
              color={'$inversed'}
              placeholder={t('catchphrase')}
              borderWidth={0}
              fontSize={'$3'}
              placeholderTextColor={'$inversed50'}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </XStack>
      <XStack
        justifyContent="flex-end"
        marginBottom={keyboardHeight + DEVICE.height * 0.02}></XStack>
    </ModalTemplate>
  );
}

import { DEVICE } from '@/constants/config';
import LoadingButton from '../molecules/LoadingButton';
import ModalTemplate from '../templates/ModalTemplate';
import { Image, TextArea, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import useForm from '@/hooks/useForm';
import { PostForm } from '@/constants/types';
import { useMutation } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import useAppApi from '@/hooks/api/useAppApi';
import { Keyboard } from 'react-native';

export default function PostModal() {
  if (__DEV__) console.log('📃 - PostModal');

  const { t } = useTranslation();
  const { createPost } = useAppApi();

  const { mutate: fetchCreatePost, isPending } = useMutation({
    mutationFn: createPost.process,
    onSuccess: createPost.onSuccess,
    onError: createPost.onError,
  });

  const { control, onSubmit, isFormPending } = useForm<PostForm>({
    defaultValues: {
      content: '',
    },
    onSuccess: fetchCreatePost,
    keysError: ['content'],
  });

  return (
    <ModalTemplate height={90} topPadding>
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
        Poster
      </LoadingButton>
      <XStack flex={1} gap={DEVICE.width * 0.025}>
        <Image
          width={'15%'}
          aspectRatio={1}
          borderRadius={'$round'}
          source={{
            uri: 'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
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
    </ModalTemplate>
  );
}

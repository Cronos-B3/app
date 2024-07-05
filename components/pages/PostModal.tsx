import { DEVICE } from '@/constants/config';
import LoadingButton from '../molecules/LoadingButton';
import ModalTemplate from '../templates/ModalTemplate';
import { Image, Stack, TextArea, useTheme, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import useForm from '@/hooks/useForm';
import { PostForm } from '@/constants/types';
import { useMutation } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import usePostsApi from '@/hooks/api/app/usePostApi';

export default function PostModal() {
  if (__DEV__) console.log('📃 - PostModal');

  const { t } = useTranslation();
  const { createPost } = usePostsApi();
  const [keyboardHeight, setKeyboardHeight] = useState(() => 0);
  const theme = useTheme();

  const items = [
    { value: 1, label: '1 minutes' },
    { value: 5, label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 1 * 60, label: '1 heure' },
    { value: 3 * 60, label: '3 heures' },
    { value: 6 * 60, label: '6 heures' },
    { value: 12 * 60, label: '12 heures' },
    { value: 1 * 24 * 60, label: '1 jour' },
  ];

  const [selected, setSelected] = useState(() => items[0]);

  const { mutate: fetchCreatePost, isPending } = useMutation({
    mutationFn: createPost.process,
    onSuccess: createPost.onSuccess,
    onError: createPost.onError,
  });

  const { control, onSubmit, isFormPending } = useForm<PostForm>({
    defaultValues: {
      content: '',
      finishedAt: items[0].value,
    },
    onSuccess: fetchCreatePost,
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
      <XStack justifyContent="flex-end" marginBottom={keyboardHeight + DEVICE.height * 0.02}>
        <Stack
          height={DEVICE.height * 0.045}
          aspectRatio={4}
          borderRadius={'$round'}
          backgroundColor={'$secondary'}>
          <Controller
            control={control}
            name="finishedAt"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Dropdown
                mode="modal"
                labelField="label"
                valueField="value"
                data={items}
                onChange={(item) => {
                  setSelected(item);
                  onChange(item.value);
                }}
                value={selected}
                style={{ flex: 1, paddingHorizontal: '10%' }}
                selectedTextStyle={{ color: theme.inversed.val }}
                iconColor={theme.inversed.val}
                containerStyle={{
                  height: DEVICE.height,
                  width: DEVICE.width,
                  backgroundColor: theme.notInversed25.val,
                  borderWidth: 0,
                  justifyContent: 'center',
                  paddingHorizontal: '10%',
                }}
                itemContainerStyle={{ backgroundColor: theme.modalBackground.val }}
                itemTextStyle={{ color: theme.inversed.val }}
                activeColor={theme.secondary.val}
              />
            )}
          />
        </Stack>
      </XStack>
    </ModalTemplate>
  );
}

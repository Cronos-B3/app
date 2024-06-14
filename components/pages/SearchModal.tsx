import { Stack, XStack } from 'tamagui';
import ModalTemplate from '../templates/ModalTemplate';
import { DEVICE } from '@/constants/config';
import { useState } from 'react';
import SearchTab from '../molecules/SearchTab';
import { useTranslation } from 'react-i18next';
import SearchInput from '../molecules/SearchInput';

export default function SearchModal() {
  if (__DEV__) console.log('📃 - SearchModal');

  const [tab, setTab] = useState<'user' | 'post'>(() => 'user');

  const { t } = useTranslation('app');

  return (
    <ModalTemplate height={90}>
      <Stack height={DEVICE.height * 0.1} justifyContent="center" marginHorizontal={'12.5%'}>
        <SearchInput height={'50%'} paddingHorizontal={DEVICE.width * 0.035} />
      </Stack>
      <XStack height={DEVICE.height * 0.04} gap={DEVICE.width * 0.05}>
        <SearchTab height={'100%'} isFocus={tab === 'user'} onPress={() => setTab('user')}>
          {t('users')}
        </SearchTab>
        <SearchTab height={'100%'} isFocus={tab === 'post'} onPress={() => setTab('post')}>
          {t('posts')}
        </SearchTab>
      </XStack>
    </ModalTemplate>
  );
}

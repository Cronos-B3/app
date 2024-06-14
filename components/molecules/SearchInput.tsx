import { GetProps, styled } from 'tamagui';
import Input from '../atoms/Input';
import { useTranslation } from 'react-i18next';

const StyledSearchInput = styled(Input, {
  borderWidth: 1,
  borderRadius: '$3',
  borderColor: '$inversed75',
  placeholderTextColor: '$inversed75',
});

export type SearchTabProps = GetProps<typeof StyledSearchInput>;

const SearchInput = StyledSearchInput.styleable(({ ...props }, ref) => {
  const { t } = useTranslation();

  return <StyledSearchInput {...props} placeholder={t('search')} ref={ref} />;
});

export default SearchInput;

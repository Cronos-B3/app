import {
  useForm as useFormRHF,
  UseFormReturn,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  SubmitErrorHandler,
  FieldErrors,
} from 'react-hook-form';
import { useState } from 'react';
import stringToLowerCase from '@/lib/stringToLowerCase';
import { useToastController } from '@tamagui/toast';
import { useTranslation } from 'react-i18next';

type UseFormProps<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: FieldErrors<T>) => void;
  keysError?: Array<keyof T>;
  delay?: number;
};

const useForm = <T extends FieldValues>({
  defaultValues,
  onSuccess,
  onError,
  keysError,
  delay = 200,
}: UseFormProps<T>) => {
  const { control, handleSubmit, ...rest }: UseFormReturn<T> = useFormRHF<T>({ defaultValues });
  const [isFormPending, setIsFormPending] = useState(false);
  const toast = useToastController();
  const { t } = useTranslation('form');

  const makeFormPending = async (callback: () => void) => {
    if (delay === 0) return callback();

    setIsFormPending(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    callback();
    setIsFormPending(false);
  };

  const onFormSubmit: SubmitHandler<T> = async (data) => {
    makeFormPending(() => {
      if (!onSuccess) return;
      onSuccess(data);
    });
  };

  const onFormError: SubmitErrorHandler<T> = async (error) => {
    makeFormPending(() => {
      if (keysError) {
        keysError.every((key) => {
          const keyError = error[key];
          if (keyError) {
            toast.show(t(`error.${String(key)}.${String(keyError.type).toLocaleLowerCase()}`));
            return false;
          }
          return true;
        });
      } else {
        if (!onError) return;
        onError(error);
      }
    });
  };

  return {
    control,
    onSubmit: handleSubmit(onFormSubmit, onFormError),
    isFormPending,
    ...rest,
  };
};

export default useForm;

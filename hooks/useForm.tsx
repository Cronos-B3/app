import {
  useForm as useFormRHF,
  UseFormReturn,
  FieldValues,
  DefaultValues,
  SubmitHandler,
} from 'react-hook-form';
import { useState } from 'react';

type UseFormProps<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSuccess?: (data: T) => void;
  onError?: () => void;
  delay?: number;
};

const useForm = <T extends FieldValues>({
  defaultValues,
  onSuccess,
  onError,
  delay = 200,
}: UseFormProps<T>) => {
  const { control, handleSubmit, ...rest }: UseFormReturn<T> = useFormRHF<T>({ defaultValues });
  const [isFormPending, setIsFormPending] = useState(false);

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

  const onFormError = async () => {
    makeFormPending(() => {
      if (!onError) return;
      onError();
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

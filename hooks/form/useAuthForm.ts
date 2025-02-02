import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Credentails } from '@/constants/Credentails';
import { showErrorToast } from '@/utils/showToast';

import { useSession } from '../useSession';

type SignInInputs = {
  email: string;
  password: string;
};

export const useAuthForm = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<SignInInputs>({
    mode: 'onChange',
  });
  const { signIn } = useSession();

  const login = (data: SignInInputs) => {
    if (
      data.email === Credentails.EMAIL &&
      data.password === Credentails.PASSWORD
    ) {
      signIn();
      router.replace('/');
    } else {
      showErrorToast({ description: t('auth_screen.invalid_credentials') });
    }
  };

  return {
    control,
    submit: handleSubmit(login),
    reset,
  };
};

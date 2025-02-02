import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AsyncStorageKeys } from '@/constants/AsyncStorageKeys';
import { AsyncStorage } from '@/services/AsyncStorage';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';

type UserData = {
  email: string;
  name: string;
  image: string;
};

export const useUserDataForm = () => {
  const { t } = useTranslation();

  const { control, handleSubmit, reset, watch, setValue } = useForm<UserData>({
    mode: 'onChange',
  });

  const image = watch('image');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.get<UserData>(
        AsyncStorageKeys.userData
      );
      userData && reset(userData);
    };

    fetchUserData();
  }, []);

  const hadndleUserData = async (data: UserData) => {
    try {
      await AsyncStorage.add(AsyncStorageKeys.userData, data);
      showSuccessToast({ description: t('profile_screen.user_data_saved') });
    } catch (e) {
      showErrorToast({ description: t('profile_screen.user_data_error') });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      const userData = await AsyncStorage.get<UserData>(
        AsyncStorageKeys.userData
      );
      await AsyncStorage.add(AsyncStorageKeys.userData, {
        ...userData,
        image: newImage,
      });

      setValue('image', newImage);
    }
  };

  return {
    control,
    submit: handleSubmit(hadndleUserData),
    reset,
    pickImage,
    image,
  };
};

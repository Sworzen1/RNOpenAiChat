import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from '@/hooks/form/useAuthForm';
import { ControlledInput } from '@/components/ControlledInput';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';

const AuthScreen = () => {
  const { t } = useTranslation();
  const { control, submit } = useAuthForm();

  return (
    <Screen.Form
      keyboardAwareProps={{ contentContainerStyle: styles.container }}
    >
      <Text variant="headline3" style={styles.title}>
        {t('auth_screen.sign-in')}
      </Text>
      <ControlledInput
        control={control}
        name="email"
        placeholder={t('auth_screen.email')}
      />
      <ControlledInput
        control={control}
        name="password"
        placeholder={t('auth_screen.password')}
        secureTextEntry
        style={{ marginVertical: 10 }}
      />
      <Button.Solid label={t('auth_screen.sign-in')} onPress={submit} />
    </Screen.Form>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AuthScreen;

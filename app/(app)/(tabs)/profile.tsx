import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';

import { Button } from '@/components/Button';
import { SelectModal } from '@/components/SelectModal';
import { Spacer } from '@/components/Spacer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Images } from '@/constants/Images';
import { ControlledInput } from '@/components/ControlledInput';
import { useUserDataForm } from '@/hooks/form/useUserDataForm';
import { useSession } from '@/hooks/useSession';
import { useTheme } from '@/hooks/useTheme';
import { resources } from '@/i18n/i18n';

type ProfileItemProps = {
  label: string;
  onPress?: () => void;
  rightElement?: JSX.Element;
  style?: ViewStyle;
};

const ImagePicker = ({
  image,
  pickImage,
}: {
  image: string;
  pickImage: () => void;
}) => {
  return (
    <View style={styles.pickImageContainer}>
      <Image source={image} placeholder={Images.logo} style={styles.avatar} />
      <Pressable onPress={pickImage} style={styles.pickImageButton}>
        <Text style={{ color: 'white' }}>+</Text>
      </Pressable>
    </View>
  );
};

const ProfileItem = ({
  label,
  onPress,
  style,
  rightElement,
}: ProfileItemProps) => {
  const { getColor } = useTheme();
  const borderColor = getColor('border').main;
  const iconColor = getColor('icon').primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.profileItem, { borderColor }, style]}
    >
      <Text>{label}</Text>
      {rightElement ? rightElement : <ChevronRight color={iconColor} />}
    </Pressable>
  );
};

export default function Profile() {
  const { signOut } = useSession();
  const { i18n, t } = useTranslation();
  const { getColor } = useTheme();

  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);

  const backgroundColor = getColor('background').muted;
  const iconColor = getColor('icon').primary;

  const { control, submit, image, pickImage } = useUserDataForm();

  return (
    <Screen.ScrollView>
      <View style={[styles.section, { backgroundColor }]}>
        <ImagePicker {...{ image, pickImage }} />
        <ProfileItem
          label={t('profile_screen.name')}
          rightElement={
            <ControlledInput
              control={control}
              name="name"
              placeholder={t('profile_screen.name_placeholder')}
              style={styles.input}
            />
          }
        />
        <ProfileItem
          label={t('profile_screen.email')}
          rightElement={
            <ControlledInput
              control={control}
              name="email"
              placeholder={t('profile_screen.email_placeholder')}
              style={styles.input}
            />
          }
          style={{ borderBottomWidth: 0 }}
        />
      </View>
      <Spacer y={4} />
      <Button.Solid label={t('profile_screen.save')} onPress={submit} />
      <Spacer y={4} />
      <View style={[styles.section, { backgroundColor }]}>
        <ProfileItem
          label={t('profile_screen.appearance')}
          rightElement={<ThemeToggle />}
        />
        <ProfileItem
          label={`${t('common.language')}`}
          onPress={() => setIsLanguagesOpen(true)}
          style={{ borderBottomWidth: 0 }}
          rightElement={
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>
                {t(`languages.${i18n.language}`)}
              </Text>
              <ChevronRight color={iconColor} />
            </View>
          }
        />
      </View>
      <Spacer y={4} />
      <Button.Outlined label={t('profile_screen.logout')} onPress={signOut} />
      <SelectModal
        isOpen={isLanguagesOpen}
        onClose={() => setIsLanguagesOpen(false)}
        selectedOption={i18n.language}
        onChange={i18n.changeLanguage}
        options={Object.keys(resources).map((item) => {
          return { value: item, label: t(`languages.${item}`) };
        })}
      />
    </Screen.ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    height: 128,
    width: 128,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: { flex: 1, marginLeft: 12 },
  languageContainer: { alignItems: 'center', flexDirection: 'row' },
  languageText: { marginRight: 4, opacity: 0.6 },
  pickImageButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 999,
    bottom: 4,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    width: 32,
  },
  pickImageContainer: {
    marginVertical: 12,
    alignSelf: 'center',
    height: 128,
    width: 128,
  },
  profileItem: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  section: {
    borderRadius: 5,
    paddingHorizontal: 12,
  },
});

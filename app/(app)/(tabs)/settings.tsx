import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable, ViewStyle, Linking } from "react-native";

import { Button } from "@/components/Button";
import { SelectModal } from "@/components/SelectModal";
import { Spacer } from "@/components/Spacer";
import { Links } from "@/constants/Links";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSession } from "@/hooks/useSession";
import { resources } from "@/i18n/i18n";
import { useTheme } from "@/hooks/useTheme";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";

type SettingsItemProps = {
  label: string;
  onPress?: () => void;
  rightElement?: JSX.Element;
  style?: ViewStyle;
};

const SettingsItem = ({
  label,
  onPress,
  style,
  rightElement,
}: SettingsItemProps) => {
  const { getColor } = useTheme();
  const borderColor = getColor("border").main;
  const iconColor = getColor("icon").primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.settingItem, { borderColor }, style]}
    >
      <Text>{label}</Text>
      {rightElement ? rightElement : <ChevronRight color={iconColor} />}
    </Pressable>
  );
};

export default function Settings() {
  const { signOut } = useSession();
  const { i18n, t } = useTranslation();
  const { getColor } = useTheme();
  const backgroundColor = getColor("background").muted;
  const iconColor = getColor("icon").primary;

  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);

  return (
    <Screen.ScrollView>
      <View style={[styles.section, { backgroundColor }]}>
        <SettingsItem
          label={t("settings_screen.appearance")}
          rightElement={<ThemeToggle />}
        />
        <SettingsItem label="Notifications" />
        <SettingsItem
          label={`${t("common.language")}`}
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

      <View style={[styles.section, { backgroundColor }]}>
        <SettingsItem label="Account settings" />
        <SettingsItem
          label="Policy privacy"
          onPress={() => Linking.openURL(Links.policy)}
        />
        <SettingsItem
          label="Terms"
          style={{ borderBottomWidth: 0 }}
          onPress={() => Linking.openURL(Links.terms)}
        />
      </View>

      <Spacer y={4} />

      <Button.Outlined label={t("settings_screen.logout")} onPress={signOut} />
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
  container: {
    flex: 1,
    padding: 20,
  },
  languageContainer: { alignItems: "center", flexDirection: "row" },
  languageText: { marginRight: 4, opacity: 0.6 },
  section: {
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
});

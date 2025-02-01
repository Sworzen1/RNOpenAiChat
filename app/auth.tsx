import { Image } from "expo-image";
import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking,
  GestureResponderEvent,
} from "react-native";
import { useTranslation, Trans } from "react-i18next";

import { useAuthForm } from "@/hooks/form/useAuthForm";
import { ControlledInput } from "@/components/ControlledInput";
import { Button } from "@/components/Button";
import { Images } from "@/constants/Images";
import { ControlledCheckbox } from "@/components/ControlledCheckbox";
import { Spacer } from "@/components/Spacer";
import { Links } from "@/constants/Links";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";

const ClickableUnderlineText = ({
  children,
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
}) => (
  <Pressable onPress={onPress}>
    <Text style={{ textDecorationLine: "underline" }}>{children}</Text>
  </Pressable>
);

const AuthScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { t } = useTranslation();
  const { control, reset, submit } = useAuthForm(isSignIn);

  return (
    <Screen.Form
      keyboardAwareProps={{ contentContainerStyle: { paddingTop: "30%" } }}
    >
      <Image source={Images.logo} style={styles.logo} />
      <Text variant="headline3" style={styles.title}>
        {isSignIn ? t("auth_screen.sign-in") : t("auth_screen.sign-up")}
      </Text>
      <ControlledInput control={control} name="email" placeholder="Email" />
      <ControlledInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />

      {!isSignIn && (
        <ControlledInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
        />
      )}
      {!isSignIn && (
        <>
          <ControlledCheckbox
            control={control}
            name="terms"
            label={
              <Trans
                i18nKey="auth_screen.terms_policy_checkbox"
                components={[
                  <ClickableUnderlineText
                    key="terms"
                    onPress={() => Linking.openURL(Links.terms)}
                  />,
                  <ClickableUnderlineText
                    key="policy"
                    onPress={() => Linking.openURL(Links.policy)}
                  />,
                ]}
              />
            }
          />
          <Spacer y={2.5} />
        </>
      )}
      <Button.Solid
        label={isSignIn ? t("auth_screen.sign-in") : t("auth_screen.sign-up")}
        onPress={submit}
      />
      <Spacer y={2.5} />
      <Button.Text
        label={
          isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"
        }
        onPress={() => {
          reset(undefined, { keepValues: false });
          setIsSignIn(!isSignIn);
        }}
      />
    </Screen.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  logo: { alignSelf: "center", height: 90, width: 90, marginBottom: 40 },
  switchText: {
    marginTop: 20,
  },
});

export default AuthScreen;

import { FC, PropsWithChildren, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { AsyncStorage } from "@/services/AsyncStorage";
import { AsyncStorageKeys } from "@/constants/AsyncStorageKeys";
import { useTheme } from "@/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setIsDark } = useTheme();

  const prepareTheme = async () => {
    const isDark: boolean | null = await AsyncStorage.get(
      AsyncStorageKeys.isDarkTheme,
    );

    setIsDark(isDark ?? false);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await prepareTheme();
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const hideSplash = async () => await SplashScreen.hideAsync();

    if (appIsReady) {
      hideSplash();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return children;
};

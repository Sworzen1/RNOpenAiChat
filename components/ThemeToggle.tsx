import { Moon, Sun } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/useTheme";
import { AsyncStorage } from "@/services/AsyncStorage";
import { AsyncStorageKeys } from "@/constants/AsyncStorageKeys";

const INDICATOR_SIZE = 26;

export const ThemeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const animatedX = withTiming(
      interpolate(Number(isDark), [0, 1], [0, INDICATOR_SIZE]),
      { duration: 300 },
    );
    const animatedBgColor = withTiming(
      interpolateColor(Number(isDark), [0, 1], ["gold", "mediumslateblue"]),
      { duration: 500 },
    );
    return { backgroundColor: animatedBgColor, marginLeft: animatedX };
  });

  const onChange = async () => {
    setIsDark(!isDark);
    await AsyncStorage.add(AsyncStorageKeys.isDarkTheme, !isDark);
  };

  return (
    <Pressable onPress={onChange} style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]}>
        {!isDark ? (
          <Sun size={18} color="black" />
        ) : (
          <Moon size={18} color="white" />
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    height: INDICATOR_SIZE + 8,
    width: INDICATOR_SIZE * 2 + 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
  },
});

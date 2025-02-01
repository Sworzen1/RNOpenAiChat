import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const INDICATOR_SIZE = 26;

type SwitchProps = {
  checked: boolean;
  onChange?: () => void;
};

export const Switch = ({ checked, onChange }: SwitchProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const animatedMarginLeft = withTiming(
      interpolate(Number(checked), [0, 1], [0, INDICATOR_SIZE]),
      { duration: 300 },
    );
    const animatedBgColor = withTiming(
      interpolateColor(Number(checked), [0, 1], ["silver", "dodgerblue"]),
      { duration: 500 },
    );
    return { backgroundColor: animatedBgColor, marginLeft: animatedMarginLeft };
  });

  return (
    <Pressable onPress={onChange} style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
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

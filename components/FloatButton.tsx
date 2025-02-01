import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

import { Text } from "@/components/Text";
import { useTheme } from "@/hooks/useTheme";

type FloatButtonProps = {
  backgroundColor?: string;
  bottom?: number;
  color?: string;
  icon?: string;
  onPress?: () => void;
  position?: "left" | "right" | "center";
  size?: number;
};

export const FloatButton = ({
  onPress,
  backgroundColor,
  bottom = 20,
  color = "#FFFFFF",
  icon = "+",
  position = "right",
  size = 52,
}: FloatButtonProps) => {
  const { getColor } = useTheme();
  const bgColor = getColor("primary");

  const getPosition = {
    left: { left: 20 },
    center: { left: "50%", transform: [{ translateX: (-size + 10) / 2 }] },
    right: { right: 20 },
  }[position] as ViewStyle;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor ? backgroundColor : bgColor.main,
          width: size,
          height: size,
        },
        styles.container,
        { bottom: bottom, ...getPosition },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.icon, { color: color, fontSize: size / 2 }]}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    position: "absolute",
    zIndex: 999,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    textAlign: "center",
  },
});

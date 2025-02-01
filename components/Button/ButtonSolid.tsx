import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "@/components/Text";

import type { ButtonProps } from "./Button.types";

export const ButtonSolid = ({ label, style, ...rest }: ButtonProps) => {
  const { getColor } = useTheme();
  const color = getColor("primary");

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color.main }, style]}
      {...rest}
    >
      <Text style={styles.buttonText} variant="title2">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "@/components/Text";

import type { ButtonProps } from "./Button.types";

export const ButtonOutlined = ({ label, style, ...rest }: ButtonProps) => {
  const { getColor } = useTheme();
  const color = getColor("primary");

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: color.main,
        },
        style,
      ]}
      {...rest}
    >
      <Text style={{ color: color.main }} variant="title2">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    width: "100%",
  },
});

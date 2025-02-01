import { Check } from "lucide-react-native";
import { Pressable, View, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Text } from "@/components/Text";

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: () => void;
};

export const Checkbox = ({
  checked = false,
  disabled = false,
  onChange,
  label,
}: CheckboxProps) => {
  const { getColor } = useTheme();
  const color = getColor("primary");

  return (
    <Pressable disabled={disabled} onPress={onChange} style={styles.container}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? color.main : "white",
          },
        ]}
      >
        {checked && <Check color="white" size={18} strokeWidth={4} />}
      </View>
      {label && <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 5,
    height: 24,
    width: 24,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: { flex: 1 },
});

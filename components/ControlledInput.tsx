import { useTheme } from "@/hooks/useTheme";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type ControlledInputProps = TextInputProps & {
  control: any;
  name: string;
};

export const ControlledInput = ({
  control,
  name,
  ...rest
}: ControlledInputProps) => {
  const { getColor } = useTheme();
  const textColor = getColor("text");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          {...rest}
          autoCapitalize="none"
          placeholderTextColor={textColor.disabled}
          onChangeText={field.onChange}
          style={[styles.input, { color: textColor.primary }]}
          value={field.value}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});

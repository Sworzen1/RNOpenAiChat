import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const Input = (rest: TextInputProps) => {
  const { getColor } = useTheme();
  const textColor = getColor('text');

  return (
    <TextInput
      {...rest}
      autoCapitalize="none"
      placeholderTextColor={textColor.disabled}
      style={[styles.input, { color: textColor.primary }, rest.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    width: '100%',
  },
});

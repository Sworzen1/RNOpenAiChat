import { Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from './Input';

type ControlledInputProps = TextInputProps & {
  control: any;
  name: string;
};

export const ControlledInput = ({
  control,
  name,
  ...rest
}: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...rest}
          style={rest.style}
          onChangeText={field.onChange}
          value={field.value}
        />
      )}
    />
  );
};

import { Pressable, ScrollView, StyleSheet } from "react-native";

import { Text } from "@/components/Text";

import { Modal, ModalProps } from "./Modal";
import type { SelectProps } from "./Select";
import { useTheme } from "@/hooks/useTheme";

type SelectModalProps = ModalProps & SelectProps;

export const SelectModal = ({
  isOpen,
  onClose,
  selectedOption,
  options,
  onChange,
}: SelectModalProps) => {
  const { isDark } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ScrollView bounces={false}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => {
              onChange(option.value);
              onClose();
            }}
            style={[
              styles.option,
              {
                backgroundColor:
                  selectedOption === option.value
                    ? isDark
                      ? "#FFFFFF33"
                      : "#00000033"
                    : undefined,
              },
            ]}
          >
            <Text variant="title2">{option.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

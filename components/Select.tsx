import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ChevronDown } from "lucide-react-native";

import { Text } from "@/components/Text";

import { SelectModal } from "./SelectModal";

export type SelectProps = {
  onChange: (newValue: string) => void;
  options: { value: string; label: string }[];
  selectedOption: string;
};

export const Select = ({ onChange, options, selectedOption }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={styles.container}>
        <Text>
          {options.find((option) => option.value === selectedOption)?.label}
        </Text>
        <ChevronDown color="black" />
      </Pressable>
      <SelectModal
        isOpen={isOpen}
        onChange={onChange}
        onClose={() => setIsOpen(false)}
        options={options}
        selectedOption={selectedOption}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

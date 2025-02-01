import { View } from "react-native";

const SPACING = 4;

type SpacerProps = {
  x?: number;
  y?: number;
};

export const Spacer = ({ x = 0, y = 0 }: SpacerProps) => {
  return <View style={{ marginTop: y * SPACING, marginRight: x * SPACING }} />;
};

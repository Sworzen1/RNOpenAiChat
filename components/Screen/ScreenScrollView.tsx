import { useTheme } from "@/hooks/useTheme";
import { FC, PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

type ScreenScrollViewProps = {
  centered?: boolean;
};

export const ScreenScrollView: FC<PropsWithChildren<ScreenScrollViewProps>> = ({
  children,
  centered = false,
}) => {
  const { getColor } = useTheme();
  const backgroundColor = getColor("background");

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          alignItems: centered ? "center" : undefined,
          backgroundColor: backgroundColor.paper,
          justifyContent: centered ? "center" : undefined,
        },
      ]}
      bounces={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

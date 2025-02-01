import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

type ScreenFormProps = {
  edges?: SafeAreaViewProps["edges"];
  keyboardAwareProps?: KeyboardAwareScrollViewProps;
};

export const ScreenForm: FC<PropsWithChildren<ScreenFormProps>> = ({
  edges,
  keyboardAwareProps,
  children,
}) => {
  const { getColor } = useTheme();
  const backgroundColor = getColor("background");

  return (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor: backgroundColor.paper }}
    >
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: backgroundColor.paper },
          keyboardAwareProps?.contentContainerStyle,
        ]}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
});

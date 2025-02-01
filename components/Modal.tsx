import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React, { FC, PropsWithChildren, useEffect } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  Dimensions,
  Pressable,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

const ACTION_TRESHHOLD = 100;

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const height = useSharedValue(0);
  const { getColor, isDark } = useTheme();

  const backgroundColor = getColor("background").default;
  const iconColor = getColor("icon").primary;

  const close = () => {
    "worklet";
    height.value = withTiming(0, {}, () => runOnJS(onClose)());
  };

  const pan = Gesture.Pan().onUpdate(({ absoluteY }) => {
    if (absoluteY > ACTION_TRESHHOLD) height.value = screenHeight - absoluteY;
    if (absoluteY > screenHeight - ACTION_TRESHHOLD) {
      close();
    }
  });

  useEffect(() => {
    height.value = withTiming(
      interpolate(Number(isOpen), [0, 1], [0, screenHeight * 0.5]),
      { duration: 200 },
    );
  }, [isOpen]);

  return !isOpen ? null : (
    <RNModal
      transparent
      visible={isOpen}
      onRequestClose={close}
      animationType="fade"
    >
      <BlurView
        intensity={15}
        tint={isDark ? "extraLight" : "dark"}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: `rgba(0,0,0,0.${isDark ? 5 : 8})`,
          },
        ]}
      >
        <Pressable onPress={close} style={styles.container} />
        <Animated.View
          style={[
            styles.contentContainer,
            {
              backgroundColor,
              height,
              paddingBottom: bottomInset,
            },
          ]}
        >
          <GestureDetector gesture={pan}>
            <View style={styles.indicator} hitSlop={30} />
          </GestureDetector>
          <Pressable onPress={close} style={styles.icon}>
            <X size={32} color={iconColor} />
          </Pressable>
          {children}
        </Animated.View>
      </BlurView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 0,
    paddingTop: 12,
    position: "absolute",
    width: screenWidth,
  },
  icon: { alignSelf: "flex-end", marginBottom: 20, marginRight: 20 },
  indicator: {
    alignSelf: "center",
    backgroundColor: "gray",
    borderRadius: 99,
    height: 6,
    width: 40,
  },
});

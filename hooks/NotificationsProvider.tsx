import { useCallback } from "react";
import {
  createNotifications,
  FadeInFadeOut,
  useNotificationController,
} from "react-native-notificated";
import { NotificationsType } from "react-native-notificated/lib/typescript/types/config";
import { Pressable, StyleSheet, View } from "react-native";

import { TriangleAlert } from "lucide-react-native";
import { Info } from "lucide-react-native";
import { CircleCheck } from "lucide-react-native";
import { OctagonX } from "lucide-react-native";

import { Text } from "@/components/Text";
import { Colors } from "@/constants/Colors";

const notificationVariants = {
  default: { bg: Colors.info.background, textColor: Colors.info.text },
  error: { bg: Colors.error.background, textColor: Colors.error.text },
  success: { bg: Colors.success.background, textColor: Colors.success.text },
  warning: { bg: Colors.warning.background, textColor: Colors.warning.text },
};

const notificationIcon = {
  default: Info,
  error: OctagonX,
  success: CircleCheck,
  warning: TriangleAlert,
};

const createNotificationVariant =
  (status: NotificationsType) =>
  ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): JSX.Element => {
    const { remove } = useNotificationController();
    const removeNotification = useCallback(() => remove(), [remove]);

    const { bg, textColor } = notificationVariants[status];
    const Icon = notificationIcon[status];

    return (
      <Pressable
        onPress={removeNotification}
        style={[
          {
            backgroundColor: bg,
          },
          styles.container,
        ]}
      >
        <View style={styles.titleContainer}>
          <Icon color={textColor} />
          <Text
            variant="headline4"
            style={[{ color: textColor }, styles.title]}
          >
            {title}
          </Text>
        </View>
        <Text variant="body1" style={{ color: textColor }}>
          {description}
        </Text>
      </Pressable>
    );
  };

export const { NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    globalConfig: {
      defaultIconType: "no-icon",
      multiline: 8,
    },
  },
  duration: 5000,
  gestureConfig: {
    direction: "full",
    x: { activationDistances: 100, activationVelocities: 5 },
    y: { activationDistances: 100, activationVelocities: 5 },
  },
  isNotch: true,
  animationConfig: FadeInFadeOut,
  notificationPosition: "top",
  variants: {
    error: {
      component: createNotificationVariant("error"),
    },
    info: {
      component: createNotificationVariant("default"),
    },
    success: {
      component: createNotificationVariant("success"),
    },
    warning: {
      component: createNotificationVariant("warning"),
    },
  },
});

const styles = StyleSheet.create({
  container: { borderRadius: 12, padding: 16, width: "100%" },
  title: { marginLeft: 8 },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 6,
  },
});

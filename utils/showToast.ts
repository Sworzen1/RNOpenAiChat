import { notify } from "react-native-notificated";
import {
  DefaultVariants,
  NotificationProps,
} from "react-native-notificated/lib/typescript/defaultConfig/types";

type CustomToastProps = {
  description: string;
  title?: NotificationProps["title"];
  onPress?: NotificationProps["onPress"];
};

const showCustomToast = ({
  title: customTitle,
  variant,
  ...rest
}: CustomToastProps & {
  variant: keyof DefaultVariants;
}) => {
  const title =
    customTitle ||
    {
      error: "Error",
      info: "Information",
      warning: "Warning",
      success: "Success",
    }[variant];

  notify(variant, {
    params: {
      title,
      ...rest,
    },
  });
};

export const showErrorToast = (props: CustomToastProps): void => {
  showCustomToast({ variant: "error", ...props });
};

export const showInformationToast = (props: CustomToastProps): void => {
  showCustomToast({ variant: "info", ...props });
};
export const showSuccessToast = (props: CustomToastProps): void => {
  showCustomToast({ variant: "success", ...props });
};

export const showWarningToast = (props: CustomToastProps): void => {
  showCustomToast({ variant: "warning", ...props });
};

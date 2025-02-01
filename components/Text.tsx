import { useTheme } from "@/hooks/useTheme";
import { FC, PropsWithChildren } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

type TextVariant =
  | "headline1"
  | "headline2"
  | "headline3"
  | "headline4"
  | "title1"
  | "title2"
  | "body1"
  | "body2"
  | "label";

type TextProps = RNTextProps & {
  variant?: TextVariant;
};

const fontStyles: Record<TextVariant, TextStyle> = {
  headline1: { fontSize: 32, fontWeight: "bold" },
  headline2: { fontSize: 28, fontWeight: "bold" },
  headline3: { fontSize: 24, fontWeight: "bold" },
  headline4: { fontSize: 20, fontWeight: "bold" },
  title1: { fontSize: 18, fontWeight: "600" },
  title2: { fontSize: 16, fontWeight: "600" },
  body1: { fontSize: 16, fontWeight: "normal" },
  body2: { fontSize: 14, fontWeight: "normal" },
  label: { fontSize: 12, fontWeight: "500" },
};

export const Text: FC<PropsWithChildren<TextProps>> = ({
  children,
  style,
  variant = "body1",
  ...rest
}) => {
  const { getColor } = useTheme();
  const textColor = getColor("text");

  return (
    <RNText
      style={[{ color: textColor.primary }, fontStyles[variant], style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

import { PropsWithChildren } from "react";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonOutlined } from "./ButtonOutlined";
import { ButtonText } from "./ButtonText";

type ButtonComposition = React.FC<PropsWithChildren> & {
  Solid: typeof ButtonSolid;
  Outlined: typeof ButtonOutlined;
  Text: typeof ButtonText;
};

export const Button: ButtonComposition = ({ children }) => {
  return children;
};

Button.Solid = ButtonSolid;
Button.Outlined = ButtonOutlined;
Button.Text = ButtonText;

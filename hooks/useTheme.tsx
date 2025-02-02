import { Colors } from "@/constants/Colors";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";
type ColorTypes = keyof (typeof Colors)[Theme];
type ColorValue<T extends ColorTypes> = (typeof Colors)[Theme][T];

type ThemeValues = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  getColor: <T extends ColorTypes>(type: T) => ColorValue<T>;
};

const ThemeContext = createContext<ThemeValues | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  const getColor = useCallback(
    <T extends ColorTypes>(type: T): ColorValue<T> =>
      Colors[isDark ? "dark" : "light"][type],
    [isDark],
  );

  const value = useMemo(
    () => ({ isDark, setIsDark, getColor }),
    [isDark, getColor],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be inside ThemeProvider");
  }

  return context;
};

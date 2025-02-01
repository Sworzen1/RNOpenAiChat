import { ScreenForm } from "./ScreenForm";
import { ScreenFlatList } from "./ScreenFlatList";
import { ScreenScrollView } from "./ScreenScrollView";
import { PropsWithChildren } from "react";

type ScreenComposition = React.FC<PropsWithChildren> & {
  FlatList: typeof ScreenFlatList;
  ScrollView: typeof ScreenScrollView;
  Form: typeof ScreenForm;
};

export const Screen: ScreenComposition = ({ children }) => {
  return <>{children}</>;
};

Screen.FlatList = ScreenFlatList;
Screen.ScrollView = ScreenScrollView;
Screen.Form = ScreenForm;

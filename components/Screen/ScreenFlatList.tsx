import { FlatList, FlatListProps } from "react-native";

type ScreenFlatListProps<ItemT> = FlatListProps<ItemT> & {};

export const ScreenFlatList = <ItemT = any,>({
  ...props
}: ScreenFlatListProps<ItemT>) => {
  return <FlatList {...props} />;
};

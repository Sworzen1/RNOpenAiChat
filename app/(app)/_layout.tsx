import { Text, View } from "react-native";
import { Redirect, Slot } from "expo-router";

import { useSession } from "@/hooks/useSession";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}

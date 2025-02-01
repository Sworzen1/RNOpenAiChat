import { useState } from "react";
import { StyleSheet } from "react-native";

import { FloatButton } from "@/components/FloatButton";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { Screen } from "@/components/Screen";

export default function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <Screen.ScrollView centered>
      <Text>Home</Text>
      <FloatButton icon="+" onPress={() => setVisible(true)} />
      <Modal isOpen={visible} onClose={() => setVisible(false)} />
    </Screen.ScrollView>
  );
}

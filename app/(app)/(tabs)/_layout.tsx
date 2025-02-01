import { useTheme } from "@/hooks/useTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { getColor } = useTheme();
  const textColor = getColor("text");
  const backgroundColor = getColor("background");
  const primary = getColor("primary");

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: { color: textColor.primary },
        headerStyle: {
          backgroundColor: backgroundColor.elevated,
        },
        tabBarActiveTintColor: primary.main,
        tabBarStyle: { backgroundColor: backgroundColor.elevated },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

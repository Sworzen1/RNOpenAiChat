import { useTheme } from '@/hooks/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { getColor } = useTheme();
  const textColor = getColor('text');
  const backgroundColor = getColor('background');
  const primary = getColor('primary');

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
          tabBarAccessibilityLabel: 'Chat',
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarAccessibilityLabel: 'Profile',
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

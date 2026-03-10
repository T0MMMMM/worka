import { Checklist, Sparkle, UserCircle } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="objectives"
        options={{ tabBarIcon: ({ color }) => <Sparkle color={color} /> }}
      />
      <Tabs.Screen
        name="planning"
        options={{ tabBarIcon: ({ color }) => <Checklist color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color }) => <UserCircle color={color} /> }}
      />
    </Tabs>
  );
}

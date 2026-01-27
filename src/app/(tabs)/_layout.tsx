import { Tabs } from "expo-router";
import Svg, { Path } from "react-native-svg";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
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
        options={{
          tabBarIcon: ({ color }) => (
            <Svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3l3 -6" />
            </Svg>
          ),
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
              <Path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
              <Path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
              <Path d="M11 6l9 0" />
              <Path d="M11 12l9 0" />
              <Path d="M11 18l9 0" />
            </Svg>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <Path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </Svg>
          ),
        }}
      />
    </Tabs>
  );
}

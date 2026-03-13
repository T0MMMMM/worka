import { Dashboard, House } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Dimensions of the bar
const SLOT_W = 90;   // width per tab slot
const H_PAD = 2;      // horizontal padding inside bar
const V_PAD = 2;      // vertical padding
const INDICATOR_W = 90;
const INDICATOR_H = 90;
const BAR_TOTAL_W = SLOT_W * 2 + H_PAD * 2; // ~240px

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const insets = useSafeAreaInsets();

  // Only use first 2 tabs (objectives=0, planning=1)
  const activeIdx = Math.min(state.index, 1);

  const slideX = useSharedValue(H_PAD + activeIdx * SLOT_W);

  React.useEffect(() => {
    slideX.value = withSpring(H_PAD + Math.min(state.index, 1) * SLOT_W, {
      damping: 20,
      stiffness: 260,
      mass: 0.8,
    });
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const isDark = mode === "dark";

  const tabsConfig = [
    {
      route: state.routes[0],
      icon: (focused: boolean) => (
        <Dashboard
          color={focused ? "#FFFFFF" : isDark ? colors.textMuted : "#9A9088"}
          size={24}
        />
      ),
    },
    {
      route: state.routes[1],
      icon: (focused: boolean) => (
        <House
          color={focused ? "#FFFFFF" : isDark ? colors.textMuted : "#9A9088"}
          size={24}
        />
      ),
    },
  ];

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 14 }]} pointerEvents="box-none">
      <View style={styles.barShell}>
        <BlurView
          intensity={isDark ? 40 : 60}
          tint={isDark ? "dark" : "light"}
          style={styles.blur}
        >
          {/* Glass overlay tint */}
          <View
            style={[
              styles.glassOverlay,
              {
                backgroundColor: isDark
                  ? "rgba(42,34,24,0.6)"
                  : "rgba(255,255,255,0.3)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.45)",
              },
            ]}
          />

          {/* Sliding dark indicator */}
          <Animated.View
            style={[
              styles.indicator,
              { backgroundColor: isDark ? "#e3d8cfff" : "#000000ff" },
              indicatorStyle,
            ]}
          />

          {/* Tab buttons */}
          <View style={styles.tabs}>
            {tabsConfig.map(({ route, icon }, index) => {
              const isFocused = state.index === index;
              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  activeOpacity={0.8}
                  style={styles.tab}
                >
                  {icon(isFocused)}
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="objectives" />
      <Tabs.Screen name="planning" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  barShell: {
    width: BAR_TOTAL_W,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 16,
  },
  blur: {
    width: BAR_TOTAL_W,
    borderRadius: 32,
    overflow: "hidden",
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
    borderWidth: 1,
  },
  indicator: {
    position: "absolute",
    top: V_PAD,
    width: INDICATOR_W,
    height: INDICATOR_H,
    borderRadius: 30,
    zIndex: 0,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: H_PAD,
    paddingVertical: V_PAD,
    zIndex: 1,
  },
  tab: {
    width: SLOT_W,
    height: INDICATOR_H,
    alignItems: "center",
    justifyContent: "center",
  },
});

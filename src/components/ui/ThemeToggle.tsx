import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle as SvgCircle, Path } from "react-native-svg";

function SunIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
      <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function MoonIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ThemeToggle() {
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const isDark = mode === "dark";

  const translateX = useSharedValue(isDark ? 28 : 0);

  const handleToggle = useCallback(() => {
    translateX.value = withTiming(isDark ? 0 : 28, { duration: 250 });
    toggleMode();
  }, [isDark]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity
      onPress={handleToggle}
      activeOpacity={0.8}
      style={[
        styles.track,
        {
          backgroundColor: isDark ? colors.accent + "20" : colors.elevated,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.icons}>
        <SunIcon size={14} color={isDark ? colors.textMuted : colors.warning} />
        <MoonIcon size={14} color={isDark ? colors.accent : colors.textMuted} />
      </View>
      <Animated.View
        style={[
          styles.thumb,
          { backgroundColor: isDark ? colors.accent : colors.surface },
          thumbStyle,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 60,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    padding: 2,
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    position: "absolute",
    left: 0,
    right: 0,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});

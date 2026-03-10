import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GradientPageLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function GradientPageLayout({ children, style }: GradientPageLayoutProps) {
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);

  const gradientMid = mode === "dark" ? "#15152B" : "#e7e8f3ff";

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }, style]}>
      <LinearGradient
        colors={[colors.bg, gradientMid, colors.bg]}
        locations={[0, 0.45, 1]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

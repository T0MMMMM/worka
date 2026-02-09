import { theme } from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GradientPageLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
}

export function GradientPageLayout({
  children,
  style,
  colors,
}: GradientPageLayoutProps) {
  const gradientColors = colors || [
    theme.colors.softPink,
    "#FFFFFF",
    theme.colors.softBlue,
  ] as const;

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.5, 1]}
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

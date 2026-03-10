import { useTheme } from "@/src/hooks/useTheme";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRID_PADDING = 20;
const GAP = 12;
const HALF_WIDTH = (SCREEN_WIDTH - GRID_PADDING * 2 - GAP) / 2;

interface BentoCardProps {
  size: "small" | "wide";
  index: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function BentoCard({ size, index, children, style }: BentoCardProps) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350, delay: index * 60 }}
      style={[
        styles.card,
        { backgroundColor: colors.surface },
        size === "wide" ? styles.wide : styles.small,
        style,
      ]}
    >
      {children}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  small: {
    width: HALF_WIDTH,
    minHeight: 100,
  },
  wide: {
    width: SCREEN_WIDTH - GRID_PADDING * 2,
    minHeight: 80,
  },
});

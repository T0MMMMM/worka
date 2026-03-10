import { useTheme } from "@/src/hooks/useTheme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  backgroundColor: string;
  delay?: number;
}

export function StatItem({ icon, label, value, backgroundColor, delay = 200 }: StatItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350, delay }}
      style={[styles.card, { backgroundColor: colors.surface }]}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>{icon}</View>
      <Text style={[styles.value, { fontFamily: fonts.bold, color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { fontFamily: fonts.semiBold, color: colors.textSecondary }]}>
        {label}
      </Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 22,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});

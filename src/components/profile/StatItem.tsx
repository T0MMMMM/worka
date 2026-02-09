import { theme } from "@/src/constants/theme";
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

export function StatItem({
  icon,
  label,
  value,
  backgroundColor,
  delay = 300,
}: StatItemProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay }}
      style={styles.statItem}
    >
      <View style={[styles.markerContainer, { backgroundColor }]}>{icon}</View>
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: theme.fonts.urbanistBold,
    color: "#AAA",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.onPrimary,
  },
});

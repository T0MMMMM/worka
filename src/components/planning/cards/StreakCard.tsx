import { BentoCard } from "@/src/components/planning/BentoCard";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function FireIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22c4.97 0 8-3.03 8-8 0-2.52-1.02-5.09-2.54-7.17a1 1 0 0 0-1.63.12L14 10l-2.26-4.52a1 1 0 0 0-1.72-.13C8.03 8.2 4 13.06 4 14c0 4.97 3.03 8 8 8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function StreakCard({ index }: { index: number }) {
  const { colors, fonts } = useTheme();
  const tasks = useTaskStore((s) => s.tasks);
  const completedToday = tasks.filter((t) => t.status === "completed").length;

  return (
    <BentoCard size="small" index={index}>
      <View style={styles.content}>
        <FireIcon size={24} color={colors.warning} />
        <Text style={[styles.value, { color: colors.text, fontFamily: fonts.bold }]}>
          {completedToday}
        </Text>
        <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Complétées
        </Text>
      </View>
    </BentoCard>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
  },
});

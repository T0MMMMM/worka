import { BentoCard } from "@/src/components/planning/BentoCard";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function CompletionRateCard({ index }: { index: number }) {
  const { colors, fonts } = useTheme();
  const objectives = useObjectiveStore((s) => s.objectives);
  const avgProgress = objectives.length > 0
    ? Math.round((objectives.reduce((sum, o) => sum + o.progress, 0) / objectives.length) * 100)
    : 0;

  return (
    <BentoCard size="small" index={index}>
      <View style={styles.content}>
        <Text style={[styles.value, { color: colors.accent, fontFamily: fonts.bold }]}>
          {avgProgress}%
        </Text>
        <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Objectifs
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
    fontSize: 32,
  },
  label: {
    fontSize: 12,
  },
});

import { BentoCard } from "@/src/components/planning/BentoCard";
import { CheckCircle } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function StatsCard({ index }: { index: number }) {
  const { colors, fonts } = useTheme();
  const tasks = useTaskStore((s) => s.tasks);
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <BentoCard size="wide" index={index}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: colors.successSoft }]}>
          <CheckCircle size={18} color={colors.success} />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.value, { color: colors.text, fontFamily: fonts.bold }]}>
            {completed}/{tasks.length}
          </Text>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            Tâches complétées
          </Text>
        </View>
        <View style={[styles.progressPill, { backgroundColor: colors.elevated }]}>
          <Text style={[styles.progressText, { color: colors.accent, fontFamily: fonts.bold }]}>
            {tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0}%
          </Text>
        </View>
      </View>
    </BentoCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  value: {
    fontSize: 18,
  },
  label: {
    fontSize: 12,
  },
  progressPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
  },
});

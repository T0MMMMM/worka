import { BentoCard } from "@/src/components/planning/BentoCard";
import { Clock } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function NextTaskCard({ index }: { index: number }) {
  const { colors, fonts } = useTheme();
  const tasks = useTaskStore((s) => s.tasks);
  const nextTask = tasks.find((t) => t.status === "pending");

  if (!nextTask) return null;

  return (
    <BentoCard size="wide" index={index}>
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: nextTask.color + "14" }]}>
          <Clock size={16} color={nextTask.color} />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            Prochaine tâche
          </Text>
          <Text style={[styles.title, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>
            {nextTask.title}
          </Text>
        </View>
        <Text style={[styles.time, { color: nextTask.color, fontFamily: fonts.bold }]}>
          {nextTask.time}
        </Text>
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
  label: {
    fontSize: 11,
  },
  title: {
    fontSize: 15,
  },
  time: {
    fontSize: 16,
  },
});

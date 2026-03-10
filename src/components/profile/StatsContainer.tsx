import { Checklist, Sparkle, Target } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatItem } from "./StatItem";

interface StatsContainerProps {
  stats: { tasksCompleted: number; objectivesReached: number; productivity: number };
}

export function StatsContainer({ stats }: StatsContainerProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatItem
        icon={<Checklist size={18} color={colors.danger} />}
        label="Tâches"
        value={stats.tasksCompleted.toString()}
        backgroundColor={colors.dangerSoft}
        delay={150}
      />
      <StatItem
        icon={<Target size={18} color={colors.accent} />}
        label="Objectifs"
        value={stats.objectivesReached.toString()}
        backgroundColor={colors.accentSoft}
        delay={250}
      />
      <StatItem
        icon={<Sparkle size={18} color={colors.success} />}
        label="Productivité"
        value={`${stats.productivity}%`}
        backgroundColor={colors.successSoft}
        delay={350}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
});

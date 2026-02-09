import { Checklist, Sparkle, Target } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatItem } from "./StatItem";

interface StatsData {
  tasksCompleted: number;
  objectivesReached: number;
  productivity: number;
}

interface StatsContainerProps {
  stats: StatsData;
}

export function StatsContainer({ stats }: StatsContainerProps) {
  return (
    <View style={styles.statsContainer}>
      <StatItem
        icon={<Checklist size={16} color={theme.colors.onPrimary} />}
        label="Tâches terminées"
        value={stats.tasksCompleted.toString()}
        backgroundColor="#FFE8E0"
        delay={300}
      />
      <StatItem
        icon={<Target size={16} color={theme.colors.onPrimary} />}
        label="Objectifs atteints"
        value={stats.objectivesReached.toString()}
        backgroundColor="#E0F2FF"
        delay={400}
      />
      <StatItem
        icon={<Sparkle size={16} color={theme.colors.onPrimary} />}
        label="Productivité"
        value={`${stats.productivity}%`}
        backgroundColor="#E8F5E9"
        delay={500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
    position: "relative",
  },
});

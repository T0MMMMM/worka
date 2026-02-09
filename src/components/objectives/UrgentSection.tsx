import { AlertTriangle, Clock } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface Objective {
  id: string;
  title: string;
  progress: number;
  color: string;
  accent: string;
  daysLeft: number;
  completed: boolean;
}

interface UrgentSectionProps {
  objectives: Objective[];
}

export function UrgentSection({ objectives }: UrgentSectionProps) {
  const soonEnding = objectives.filter((o) => o.daysLeft <= 7 && !o.completed);

  if (soonEnding.length === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AlertTriangle size={18} color={theme.colors.systemOrange} />
        </View>
        <Text style={styles.title}>Bientôt à échéance</Text>
      </View>

      <View style={styles.list}>
        {soonEnding.map((obj) => (
          <View key={obj.id} style={styles.item}>
            <View style={[styles.dot, { backgroundColor: obj.accent }]} />
            <Text style={styles.itemTitle}>{obj.title}</Text>
            <View style={styles.daysContainer}>
              <Clock size={12} color={theme.colors.textSecondary} />
              <Text style={styles.daysText}>{obj.daysLeft}j</Text>
            </View>
          </View>
        ))}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.systemOrange + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.text,
  },
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: theme.fonts.urbanistSemiBold,
    color: theme.colors.text,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  daysText: {
    fontSize: 13,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.textSecondary,
  },
});

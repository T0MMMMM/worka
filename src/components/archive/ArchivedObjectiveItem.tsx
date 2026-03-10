import { useTheme } from "@/src/hooks/useTheme";
import { Objective } from "@/src/types/objective";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ArchivedObjectiveItemProps {
  objective: Objective;
}

export function ArchivedObjectiveItem({ objective }: ArchivedObjectiveItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: objective.accent }]} />
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>
          {objective.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.successSoft }]}>
          <Text style={[styles.badgeText, { color: colors.success, fontFamily: fonts.bold }]}>
            {Math.round(objective.progress * 100)}%
          </Text>
        </View>
      </View>
      {objective.archivedAt && (
        <Text style={[styles.date, { color: colors.textMuted, fontFamily: fonts.regular }]}>
          Archivé le {moment(objective.archivedAt).format("DD/MM/YYYY")}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
  },
  date: {
    fontSize: 11,
    paddingLeft: 18,
  },
});

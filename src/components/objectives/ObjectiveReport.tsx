import { useTheme } from "@/src/hooks/useTheme";
import { Objective } from "@/src/types/objective";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ObjectiveReportProps {
  objectives: Objective[];
}

export function ObjectiveReport({ objectives }: ObjectiveReportProps) {
  const { colors, fonts } = useTheme();

  const completed = objectives.filter((o) => o.completed).length;
  const inProgress = objectives.filter((o) => !o.completed && o.progress > 0).length;
  const urgent = objectives.filter((o) => !o.completed && o.daysLeft <= 7).length;
  const completionPct =
    objectives.length > 0 ? Math.round((completed / objectives.length) * 100) : 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
            Votre rapport
          </Text>
          <Text
            style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.light }]}
          >
            d'objectifs
          </Text>
        </View>
        <View style={[styles.pctBadge, { backgroundColor: colors.accentSoft }]}>
          <Text style={[styles.pctText, { color: colors.accent, fontFamily: fonts.extraBold }]}>
            {completionPct}%
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { label: "Terminés", count: completed },
          { label: "En cours", count: inProgress },
          { label: "Urgents", count: urgent },
        ].map(({ label, count }) => (
          <View key={label} style={[styles.statChip, { backgroundColor: colors.elevated }]}>
            <Text style={[styles.statCount, { color: colors.text, fontFamily: fonts.extraBold }]}>
              {count}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.textSecondary, fontFamily: fonts.regular },
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress list */}
      {objectives.length > 0 ? (
        <View style={styles.progressList}>
          {objectives.map((obj) => (
            <View key={obj.id} style={styles.progressRow}>
              <Text style={styles.progressEmoji}>{obj.image ?? "🎯"}</Text>
              <View style={styles.progressMeta}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.progressTitle,
                    { color: colors.text, fontFamily: fonts.semiBold },
                  ]}
                >
                  {obj.title}
                </Text>
                <View style={[styles.progressTrack, { backgroundColor: colors.elevated }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.round(obj.progress * 100)}%` as any,
                        backgroundColor: obj.accent,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text
                style={[
                  styles.progressPct,
                  { color: colors.textSecondary, fontFamily: fonts.bold },
                ]}
              >
                {Math.round(obj.progress * 100)}%
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text
          style={[styles.emptyText, { color: colors.textMuted, fontFamily: fonts.regular }]}
        >
          Aucun objectif pour l'instant
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    marginTop: 2,
    marginHorizontal: 2,
    width: SCREEN_WIDTH - 4,
    height: SCREEN_WIDTH - 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 18,
  },
  pctBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pctText: {
    fontSize: 15,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  statChip: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statCount: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  progressList: {
    gap: 16,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressEmoji: {
    fontSize: 20,
    width: 28,
    textAlign: "center",
  },
  progressMeta: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 13,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    marginTop: 5,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressPct: {
    fontSize: 12,
    width: 36,
    textAlign: "right",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 8,
  },
});

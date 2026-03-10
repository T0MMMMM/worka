import { AlertTriangle, Clock } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Objective } from "@/src/types/objective";

interface UrgentSectionProps {
  objectives: Objective[];
}

export function UrgentSection({ objectives }: UrgentSectionProps) {
  const { colors, fonts } = useTheme();
  const soonEnding = objectives.filter((o) => o.daysLeft <= 7 && !o.completed);
  if (soonEnding.length === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 350 }}
      style={styles.container}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {/* Header bar */}
        <View style={[styles.headerBar, { backgroundColor: colors.warning }]}>
          <AlertTriangle size={14} color="#FFF" />
          <Text style={[styles.headerText, { fontFamily: fonts.bold }]}>Bientôt à échéance</Text>
          <View style={styles.countBadge}>
            <Text style={[styles.countText, { fontFamily: fonts.bold }]}>{soonEnding.length}</Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.itemsContainer}>
          {soonEnding.map((obj, i) => (
            <View key={obj.id}>
              {i > 0 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
              <View style={styles.item}>
                <View style={[styles.dot, { backgroundColor: obj.accent }]} />
                <Text style={[styles.itemTitle, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>
                  {obj.title}
                </Text>
                <View style={[styles.daysChip, { backgroundColor: colors.warningSoft }]}>
                  <Clock size={10} color={colors.warning} />
                  <Text style={[styles.daysText, { color: colors.warning, fontFamily: fonts.bold }]}>
                    {obj.daysLeft}j
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: "#FFF",
  },
  countBadge: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    color: "#FFF",
  },
  itemsContainer: {
    padding: 16,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
  },
  daysChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  daysText: {
    fontSize: 12,
  },
});

import { Clock } from "@/src/components/ui/Icons";
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
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350 }}
      style={styles.container}
    >
      <View style={[styles.card, { backgroundColor: "#FDF0EC" }]}>
        <View style={styles.headerRow}>
          <View style={[styles.iconBox, { backgroundColor: "#F4DDD9" }]}>
            <Clock size={14} color="#D96B5A" />
          </View>
          <Text style={[styles.headerText, { color: "#D96B5A", fontFamily: fonts.bold }]}>
            Bientôt à échéance
          </Text>
          <View style={[styles.countBadge, { backgroundColor: "#D96B5A" }]}>
            <Text style={[styles.countText, { fontFamily: fonts.bold }]}>
              {soonEnding.length}
            </Text>
          </View>
        </View>

        <View style={styles.items}>
          {soonEnding.map((obj, i) => (
            <View key={obj.id} style={styles.item}>
              <View style={[styles.dot, { backgroundColor: obj.accent }]} />
              <Text
                style={[styles.itemTitle, { color: colors.text, fontFamily: fonts.semiBold }]}
                numberOfLines={1}
              >
                {obj.image ? `${obj.image} ` : ""}{obj.title}
              </Text>
              <View style={[styles.daysChip, { backgroundColor: "#F4DDD9" }]}>
                <Text style={[styles.daysText, { color: "#D96B5A", fontFamily: fonts.bold }]}>
                  {obj.daysLeft}j
                </Text>
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
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 14,
  },
  countBadge: {
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
  items: {
    gap: 10,
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
    fontSize: 14,
  },
  daysChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  daysText: {
    fontSize: 12,
  },
});

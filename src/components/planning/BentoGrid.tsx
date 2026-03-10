import React from "react";
import { StyleSheet, View } from "react-native";
import { CompletionRateCard } from "./cards/CompletionRateCard";
import { NextTaskCard } from "./cards/NextTaskCard";
import { StatsCard } from "./cards/StatsCard";
import { StreakCard } from "./cards/StreakCard";

export function BentoGrid() {
  return (
    <View style={styles.grid}>
      <StatsCard index={0} />
      <View style={styles.row}>
        <CompletionRateCard index={1} />
        <StreakCard index={2} />
      </View>
      <NextTaskCard index={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});

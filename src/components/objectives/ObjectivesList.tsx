import React from "react";
import { StyleSheet, View } from "react-native";
import { Objective } from "@/src/types/objective";
import { ObjectiveItem } from "./ObjectiveItem";

interface ObjectivesListProps {
  objectives: Objective[];
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

export function ObjectivesList({ objectives, onUpdateProgress }: ObjectivesListProps) {
  // Build rows of 2
  const rows: Objective[][] = [];
  for (let i = 0; i < objectives.length; i += 2) {
    rows.push(objectives.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((obj, i) => (
            <ObjectiveItem
              key={obj.id}
              objective={obj}
              index={rowIdx * 2 + i}
              onUpdateProgress={onUpdateProgress}
            />
          ))}
          {/* Phantom to maintain layout if odd count */}
          {row.length === 1 && <View style={styles.phantom} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    gap: 2,
  },
  row: {
    flexDirection: "row",
    gap: 2,
  },
  phantom: {
    flex: 1,
  },
});

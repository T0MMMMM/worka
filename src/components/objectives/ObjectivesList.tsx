import React from "react";
import { StyleSheet, View } from "react-native";
import { Objective, ObjectiveItem } from "./ObjectiveItem";

interface ObjectivesListProps {
  objectives: Objective[];
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

export function ObjectivesList({ objectives, onUpdateProgress }: ObjectivesListProps) {
  return (
    <View style={styles.listContainer}>
      {objectives.map((objective, index) => (
        <ObjectiveItem
          key={objective.id}
          objective={objective}
          index={index}
          onUpdateProgress={onUpdateProgress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
});

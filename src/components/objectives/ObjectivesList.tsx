import React from "react";
import { StyleSheet, View } from "react-native";
import { Objective } from "@/src/types/objective";
import { ObjectiveItem } from "./ObjectiveItem";

interface ObjectivesListProps {
  objectives: Objective[];
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

export function ObjectivesList({ objectives, onUpdateProgress }: ObjectivesListProps) {
  return (
    <View style={styles.container}>
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
  container: {
    paddingHorizontal: 20,
  },
});

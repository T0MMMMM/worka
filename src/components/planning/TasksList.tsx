import { Task } from "@/src/types/task";
import * as Haptics from "expo-haptics";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { SwipeableTaskItem } from "./SwipeableTaskItem";

interface TasksListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  onReorder?: (tasks: Task[]) => void;
}

export function TasksList({ tasks, onToggle, onDelete, onReorder }: TasksListProps) {
  const renderItem = useCallback(
    ({ item, getIndex, drag, isActive }: RenderItemParams<Task>) => {
      const index = getIndex() ?? 0;
      return (
        <ScaleDecorator>
          <SwipeableTaskItem
            task={item}
            index={index}
            onToggle={onToggle}
            onDelete={onDelete ?? (() => {})}
            onDrag={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              drag();
            }}
            isActive={isActive}
          />
        </ScaleDecorator>
      );
    },
    [onToggle, onDelete]
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => onReorder?.(data)}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

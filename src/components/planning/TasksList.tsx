import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Task, TaskItem } from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

export function TasksList({ tasks, onToggle }: TasksListProps) {
  const renderTask = ({ item, index }: { item: Task; index: number }) => (
    <TaskItem task={item} index={index} onToggle={onToggle} />
  );

  return (
    <View style={styles.timelineWrapper}>
      <View style={styles.dottedLine} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timelineWrapper: {
    flex: 1,
    position: "relative",
  },
  dottedLine: {
    position: "absolute",
    left: 54,
    top: 10,
    bottom: 150,
    width: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    zIndex: 0,
  },
  taskList: {
    paddingBottom: 100,
  },
});

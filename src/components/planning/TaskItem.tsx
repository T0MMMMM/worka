import { CheckCircle } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface Task {
  id: string;
  title: string;
  time: string;
  duration: string;
  status: "pending" | "completed";
  category: string;
  color: string;
  priority: "high" | "medium" | "low";
}

const PRIORITY_COLORS = {
  high: "#FF5252",
  medium: "#FFB142",
  low: "#4CAF50",
};

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, index, onToggle }: TaskItemProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, delay: index * 100 }}
      style={styles.taskItemContainer}
    >
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
        style={styles.taskPressable}
      >
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{task.time}</Text>
        </View>

        <View style={styles.markerContainer}>
          <View
            style={[
              styles.markerSimpleDot,
              { backgroundColor: task.color },
              task.status === "completed" && styles.markerDotCompleted,
            ]}
          />
        </View>

        <View
          style={[
            styles.taskContent,
            task.status === "completed" && styles.taskContentCompleted,
          ]}
        >
          <View style={styles.taskMainRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.categoryRow}>
                <Text style={[styles.taskCategory, { color: task.color }]}>
                  {task.category}
                </Text>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: PRIORITY_COLORS[task.priority] },
                  ]}
                >
                  <View style={styles.priorityDot} />
                  <Text style={styles.priorityText}>{task.priority}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.taskTitle,
                  task.status === "completed" && styles.taskTitleCompleted,
                ]}
              >
                {task.title}
              </Text>
            </View>
            {task.status === "completed" && (
              <View style={styles.checkWrapper}>
                <CheckCircle size={20} color={theme.colors.validated} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    marginBottom: 35,
  },
  taskPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeColumn: {
    width: 40,
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.onPrimary,
    textAlign: "right",
  },
  markerContainer: {
    width: 10,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    zIndex: 1,
  },
  markerSimpleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  markerDotCompleted: {
    backgroundColor: theme.colors.validated,
  },
  taskContent: {
    flex: 1,
  },
  taskContentCompleted: {
    opacity: 0.5,
  },
  taskMainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 2,
  },
  checkWrapper: {
    marginLeft: 10,
  },
  taskCategory: {
    fontSize: 10,
    fontFamily: theme.fonts.urbanistBold,
    textTransform: "uppercase",
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.urbanistSemiBold,
    color: theme.colors.onPrimary,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  priorityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFF",
  },
  priorityText: {
    fontSize: 8,
    fontFamily: theme.fonts.urbanistBold,
    color: "#FFF",
    textTransform: "uppercase",
  },
});

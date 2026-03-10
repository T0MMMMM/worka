import { useTheme } from "@/src/hooks/useTheme";
import { Task } from "@/src/types/task";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ArchivedTaskItemProps {
  task: Task;
}

export function ArchivedTaskItem({ task }: ArchivedTaskItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: task.color }]} />
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>
          {task.title}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={[styles.category, { color: task.color, fontFamily: fonts.bold }]}>
          {task.category}
        </Text>
        {task.archivedAt && (
          <Text style={[styles.date, { color: colors.textMuted, fontFamily: fonts.regular }]}>
            {moment(task.archivedAt).format("DD/MM/YY")}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 18,
  },
  category: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 11,
  },
});

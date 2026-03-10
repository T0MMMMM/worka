import { Task } from "@/src/types/task";
import { CheckCircle } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RecurrenceBadge } from "./RecurrenceBadge";
import { StreakIndicator } from "./StreakIndicator";

const PRIORITY_COLORS = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, index, onToggle }: TaskItemProps) {
  const { colors, fonts } = useTheme();
  const isCompleted = task.status === "completed";
  const priorityColor = PRIORITY_COLORS[task.priority];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350, delay: index * 50 }}
    >
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
        style={[styles.card, isCompleted && styles.cardCompleted]}
      >
        {/* Status indicator */}
        <View style={styles.statusCol}>
          <View style={[styles.timeLine, { backgroundColor: task.color + "20" }]} />
          <View
            style={[
              styles.statusRing,
              isCompleted
                ? { backgroundColor: colors.success }
                : { borderColor: task.color, borderWidth: 2 },
            ]}
          >
            {isCompleted && <CheckCircle size={20} color="#FFF" />}
          </View>
          <View style={[styles.timeLine, { backgroundColor: task.color + "20" }]} />
        </View>

        {/* Content */}
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <View style={styles.row}>
            <Text style={[styles.time, { color: colors.text, fontFamily: fonts.bold }]}>
              {task.time}
            </Text>
            <View style={[styles.durationBadge, { backgroundColor: colors.elevated }]}>
              <Text style={[styles.durationText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
                {task.duration}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.title,
              { color: colors.text, fontFamily: fonts.semiBold },
              isCompleted && { textDecorationLine: "line-through", color: colors.textSecondary },
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: task.color + "10" }]}>
              <View style={[styles.tagDot, { backgroundColor: task.color }]} />
              <Text style={[styles.tagText, { color: task.color, fontFamily: fonts.bold }]}>
                {task.category}
              </Text>
            </View>
            <View style={[styles.tag, { backgroundColor: priorityColor + "10" }]}>
              <View style={[styles.tagDot, { backgroundColor: priorityColor }]} />
              <Text style={[styles.tagText, { color: priorityColor, fontFamily: fonts.bold }]}>
                {task.priority}
              </Text>
            </View>
            {task.recurrence && <RecurrenceBadge recurrence={task.recurrence} />}
            {task.streak && task.streak > 0 ? <StreakIndicator streak={task.streak} /> : null}
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 14,
  },
  cardCompleted: {
    opacity: 0.45,
  },
  statusCol: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
  },
  statusRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  timeLine: {
    flex: 1,
    width: 2,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 1,
  },
  content: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
  },
  durationBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 11,
    textTransform: "capitalize",
  },
});

import { useTheme } from "@/src/hooks/useTheme";
import { Task } from "@/src/types/task";
import { MotiView } from "moti";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Check icon
const CheckIcon = ({ color = "#FFF", size = 13 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13l4 4L19 7"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Convert hex color to rgba with alpha
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface TaskRowProps {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
}

function TaskRow({ task, index, onToggle }: TaskRowProps) {
  const { colors, fonts } = useTheme();
  const isCompleted = task.status === "completed";

  const paleBg = hexToRgba(task.color, 0.18);
  const borderColor = hexToRgba(task.color, 0.45);

  return (
    <MotiView
      from={{ opacity: 0, translateX: -12 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "spring", delay: index * 50, damping: 18, stiffness: 180 }}
      style={[styles.row, { opacity: isCompleted ? 0.55 : 1 }]}
    >
      {/* Time label */}
      <View style={styles.timeCol}>
        <Text style={[styles.timeText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
          {task.time}
        </Text>
      </View>

      {/* Dot + vertical line (only decorative) */}
      <View style={styles.lineCol}>
        <View style={[styles.dot, { backgroundColor: task.color }]} />
      </View>

      {/* Task card */}
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        activeOpacity={0.75}
        style={[
          styles.card,
          {
            backgroundColor: paleBg,
            borderColor: borderColor,
          },
        ]}
      >
        <View style={styles.cardInner}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: colors.text,
                  fontFamily: fonts.semiBold,
                  textDecorationLine: isCompleted ? "line-through" : "none",
                },
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <View style={styles.cardMeta}>
              <View style={[styles.categoryDot, { backgroundColor: task.color }]} />
              <Text style={[styles.cardCategory, { color: task.color, fontFamily: fonts.semiBold }]}>
                {task.category}
              </Text>
              {task.duration ? (
                <Text style={[styles.cardDuration, { color: colors.textMuted, fontFamily: fonts.regular }]}>
                  · {task.duration}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Check button */}
          <TouchableOpacity
            onPress={() => onToggle(task.id)}
            style={[
              styles.checkBtn,
              {
                backgroundColor: isCompleted ? task.color : "rgba(255,255,255,0.7)",
                borderColor: isCompleted ? task.color : hexToRgba(task.color, 0.4),
              },
            ]}
          >
            {isCompleted ? (
              <CheckIcon color="#FFF" size={13} />
            ) : (
              <View style={[styles.checkInner, { borderColor: hexToRgba(task.color, 0.5) }]} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

interface TaskTimelineListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

export function TaskTimelineList({ tasks, onToggle }: TaskTimelineListProps) {
  const { colors, fonts } = useTheme();

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const [ah, am] = a.time.split(":").map(Number);
      const [bh, bm] = b.time.split(":").map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
  }, [tasks]);

  if (sortedTasks.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: colors.textMuted, fontFamily: fonts.regular }]}>
          Aucune tâche pour aujourd'hui
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sortedTasks.map((task, i) => (
        <TaskRow key={task.id} task={task} index={i} onToggle={onToggle} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeCol: {
    width: 50,
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 12,
  },
  lineCol: {
    width: 14,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  categoryDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  cardCategory: {
    fontSize: 11,
  },
  cardDuration: {
    fontSize: 11,
  },
  checkBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
  },
  empty: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
  },
});

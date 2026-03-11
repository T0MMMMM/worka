import { useTheme } from "@/src/hooks/useTheme";
import { Task } from "@/src/types/task";
import { MotiView } from "moti";
import React, { useMemo } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7h–22h
const SCREEN_W = Dimensions.get("window").width;
const DELETE_THRESHOLD = -90;

// Trash icon
const TrashIcon = ({ size = 18, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Check icon
const CheckIcon = ({ size = 13, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Swipeable task card ───────────────────────────────────────────────────────
interface SwipeableTaskProps {
  task: Task;
  animIndex: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function SwipeableTask({ task, animIndex, onToggle, onDelete }: SwipeableTaskProps) {
  const { colors, fonts } = useTheme();
  const translateX = useSharedValue(0);
  const isCompleted = task.status === "completed";

  const paleBg = hexToRgba(task.color, 0.15);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .onChange((e) => {
      // Only allow left swipe
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < DELETE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_W, { duration: 220 });
        runOnJS(handleDelete)();
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 280 });
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteRevealStyle = useAnimatedStyle(() => ({
    opacity: Math.min(Math.abs(translateX.value) / 80, 1),
    transform: [{ scale: Math.min(0.7 + Math.abs(translateX.value) / 270, 1) }],
  }));

  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 280, delay: animIndex * 40 }}
      style={styles.swipeWrapper}
    >
      {/* Delete hint behind card */}
      <Animated.View style={[styles.deleteHint, deleteRevealStyle]}>
        <View style={[styles.deleteCircle, { backgroundColor: colors.danger }]}>
          <TrashIcon size={16} color="#FFF" />
        </View>
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.taskCard, { backgroundColor: paleBg }, cardStyle]}>
          <View style={styles.taskInner}>
            <View style={styles.taskBody}>
              <Text
                numberOfLines={1}
                style={[
                  styles.taskTitle,
                  {
                    color: colors.text,
                    fontFamily: fonts.semiBold,
                    textDecorationLine: isCompleted ? "line-through" : "none",
                    opacity: isCompleted ? 0.55 : 1,
                  },
                ]}
              >
                {task.title}
              </Text>
              <View style={styles.taskMeta}>
                <View style={[styles.metaDot, { backgroundColor: task.color }]} />
                <Text style={[styles.metaText, { color: task.color, fontFamily: fonts.semiBold }]}>
                  {task.category}
                </Text>
                {task.duration ? (
                  <Text style={[styles.metaText, { color: colors.textMuted, fontFamily: fonts.regular }]}>
                    · {task.duration}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Toggle check */}
            <TouchableOpacity
              onPress={() => onToggle(task.id)}
              style={[
                styles.checkBtn,
                {
                  backgroundColor: isCompleted
                    ? hexToRgba(task.color, 0.9)
                    : "rgba(255,255,255,0.7)",
                },
              ]}
            >
              {isCompleted ? (
                <CheckIcon size={13} color="#FFF" />
              ) : (
                <View style={[styles.checkRing, { borderColor: hexToRgba(task.color, 0.5) }]} />
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </MotiView>
  );
}

// ── Hour slot ─────────────────────────────────────────────────────────────────
interface HourSlotProps {
  hour: number;
  tasks: Task[];
  isCurrent: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function HourSlot({ hour, tasks, isCurrent, onToggle, onDelete }: HourSlotProps) {
  const { colors, fonts } = useTheme();
  const label = `${hour.toString().padStart(2, "0")}:00`;
  const hasTasks = tasks.length > 0;

  return (
    <View style={styles.slot}>
      {/* Time column */}
      <View style={styles.timeCol}>
        <Text
          style={[
            styles.timeLabel,
            {
              fontFamily: isCurrent ? fonts.bold : fonts.regular,
              color: isCurrent ? colors.text : colors.textMuted,
            },
          ]}
        >
          {label}
        </Text>
      </View>

      {/* Timeline line + dot */}
      <View style={styles.lineCol}>
        <View
          style={[
            styles.hourDot,
            {
              backgroundColor: isCurrent
                ? colors.text
                : hasTasks
                ? colors.textSecondary
                : colors.border,
              width: isCurrent ? 9 : 6,
              height: isCurrent ? 9 : 6,
              borderRadius: 5,
              marginTop: 2,
            },
          ]}
        />
        <View
          style={[
            styles.vLine,
            { backgroundColor: colors.border, opacity: hasTasks ? 0.6 : 0.3 },
          ]}
        />
      </View>

      {/* Content */}
      <View style={styles.contentCol}>
        {hasTasks ? (
          tasks.map((task, i) => (
            <SwipeableTask
              key={task.id}
              task={task}
              animIndex={i}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
          <View style={styles.emptyLine}>
            <View style={[styles.emptyDash, { backgroundColor: colors.border }]} />
          </View>
        )}
      </View>
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface DayTimelineProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DayTimeline({ tasks, onToggle, onDelete }: DayTimelineProps) {
  const currentHour = new Date().getHours();

  const tasksByHour = useMemo(() => {
    const map: Record<number, Task[]> = {};
    tasks.forEach((t) => {
      const hour = parseInt(t.time.split(":")[0], 10);
      if (!isNaN(hour)) {
        if (!map[hour]) map[hour] = [];
        map[hour].push(t);
      }
    });
    return map;
  }, [tasks]);

  return (
    <View style={styles.container}>
      {HOURS.map((hour) => (
        <HourSlot
          key={hour}
          hour={hour}
          tasks={tasksByHour[hour] ?? []}
          isCurrent={hour === currentHour}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  slot: {
    flexDirection: "row",
    minHeight: 48,
  },
  timeCol: {
    width: 54,
    paddingRight: 4,
    paddingTop: 0,
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 11,
    lineHeight: 16,
    paddingTop: 0,
  },
  lineCol: {
    width: 18,
    alignItems: "center",
    paddingTop: 2,
  },
  hourDot: {},
  vLine: {
    flex: 1,
    width: 1.5,
    marginTop: 3,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 6,
  },
  emptyLine: {
    height: 42,
    justifyContent: "center",
  },
  emptyDash: {
    width: 24,
    height: 1,
    borderRadius: 1,
  },
  // Swipeable
  swipeWrapper: {
    marginBottom: 6,
    position: "relative",
  },
  deleteHint: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  deleteCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  taskCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  taskInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskBody: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  metaText: {
    fontSize: 11,
  },
  checkBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  checkRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
  },
});

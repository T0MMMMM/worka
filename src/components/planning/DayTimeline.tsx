import { useTheme } from "@/src/hooks/useTheme";
import { Task } from "@/src/types/task";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SwipeableTaskCard } from "./SwipeableTaskCard";

const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7h–22h

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
            <SwipeableTaskCard
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

  // Stable callbacks so React.memo on SwipeableTaskCard prevents unnecessary re-renders
  const stableToggle = useCallback((id: string) => onToggle(id), [onToggle]);
  const stableDelete = useCallback((id: string) => onDelete(id), [onDelete]);

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
          onToggle={stableToggle}
          onDelete={stableDelete}
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
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 6,
  },
  timeLabel: {
    fontSize: 11,
    lineHeight: 16,
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
    paddingVertical: 6,
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
});

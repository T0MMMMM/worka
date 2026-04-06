import { useTheme } from "@/src/hooks/useTheme";
import { Task } from "@/src/types/task";
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface DayTimelineRef {
  scrollToNextTask: () => void;
}
import { SwipeableTaskCard } from "./SwipeableTaskCard";

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0h–23h
const SLOT_HEIGHT = 64; // approximate height of an empty slot for auto-scroll

// ── Hour slot ─────────────────────────────────────────────────────────────────
interface HourSlotProps {
  hour: number;
  tasks: Task[];
  isCurrent: boolean;
  currentTimeStr: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function HourSlot({ hour, tasks, isCurrent, currentTimeStr, onToggle, onDelete }: HourSlotProps) {
  const { colors, fonts } = useTheme();
  const label = `${hour.toString().padStart(2, "0")}:00`;
  const hasTasks = tasks.length > 0;

  return (
    <View style={styles.slot}>
      {/* Divider: full-width line + time label on right */}
      <View style={styles.divider}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: isCurrent ? colors.accent : colors.border,
              opacity: isCurrent ? 0.8 : 0.5,
            },
          ]}
        />
        <Text
          style={[
            styles.timeLabel,
            {
              color: isCurrent ? colors.accent : colors.textSecondary,
              fontFamily: isCurrent ? fonts.bold : fonts.regular,
            },
          ]}
        >
          {isCurrent ? currentTimeStr : label}
        </Text>
      </View>

      {/* Cards or empty spacer */}
      <View style={styles.cardsArea}>
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
          <View style={{ height: 48 }} />
        )}
      </View>
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface DayTimelineProps {
  tasks: Task[];
  isToday: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DayTimeline = React.forwardRef<DayTimelineRef, DayTimelineProps>(
function DayTimeline({ tasks, isToday, onToggle, onDelete }, ref) {
  const scrollRef = useRef<ScrollView>(null);

  const now = new Date();
  const currentHour = isToday ? now.getHours() : -1;
  const currentTimeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

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

  useImperativeHandle(ref, () => ({
    scrollToNextTask: () => {
      const hours = Object.keys(tasksByHour).map(Number).sort((a, b) => a - b);
      if (hours.length === 0) return;
      const targetHour = isToday
        ? hours.find((h) => h >= currentHour) ?? hours[0]
        : hours[0];
      const offset = Math.max(0, targetHour + 1) * SLOT_HEIGHT;
      scrollRef.current?.scrollTo({ y: offset, animated: true });
    },
  }), [tasksByHour, isToday, currentHour]);

  // Auto-scroll to current hour on mount
  useEffect(() => {
    const offset = Math.max(0, currentHour - 1) * SLOT_HEIGHT;
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: offset, animated: false });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        snapToInterval={SLOT_HEIGHT}
        decelerationRate="fast"
      >
        {HOURS.map((hour) => (
          <HourSlot
            key={hour}
            hour={hour}
            tasks={tasksByHour[hour] ?? []}
            isCurrent={hour === currentHour}
            currentTimeStr={currentTimeStr}
            onToggle={stableToggle}
            onDelete={stableDelete}
          />
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>

    </View>
  );
});

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  slot: {},
  divider: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  timeLabel: {
    width: 56,
    textAlign: "right",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardsArea: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 2,
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    pointerEvents: "none",
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    pointerEvents: "none",
  },
});

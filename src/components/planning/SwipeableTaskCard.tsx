import { useTheme } from "@/src/hooks/useTheme";
import { useTaskThemeStore } from "@/src/store/taskThemeStore";
import { Task } from "@/src/types/task";
import { MotiView } from "moti";
import React, { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const REVEAL_X = -60;
const TRIGGER = -25;

const PRIORITY_COLORS: Record<string, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

const TrashIcon = ({ size = 16, color = "#FFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = ({ size = 13, color = "#FFF" }) => (
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

interface SwipeableTaskCardProps {
  task: Task;
  animIndex: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function SwipeableTaskCardComponent({
  task,
  animIndex,
  onToggle,
  onDelete,
}: SwipeableTaskCardProps) {
  const { colors, fonts } = useTheme();
  const themes = useTaskThemeStore((s) => s.themes);
  const themeEmoji = themes.find((t) => t.label === task.category)?.emoji ?? "📌";
  const translateX = useSharedValue(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const isCompleted = task.status === "completed";
  const priorityColor = PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium;

  const hasAnimated = useRef(false);

  const snapBack = useCallback(() => {
    translateX.value = withSpring(0, { damping: 18, stiffness: 200 });
    setIsRevealed(false);
  }, []);

  const handleDelete = useCallback(() => {
    snapBack();
    onDelete(task.id);
  }, [task.id, onDelete, snapBack]);

  const pan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .onChange((e) => {
      if (e.translationX < 0) {
        translateX.value = Math.max(e.translationX, REVEAL_X);
      } else if (isRevealed) {
        translateX.value = Math.min(REVEAL_X + e.translationX, 0);
      }
    })
    .onEnd(() => {
      if (translateX.value < TRIGGER) {
        translateX.value = withSpring(REVEAL_X, { damping: 18, stiffness: 200 });
        runOnJS(setIsRevealed)(true);
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 200 });
        runOnJS(setIsRevealed)(false);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <MotiView
      from={hasAnimated.current ? undefined : { opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 280, delay: animIndex * 40 }}
      onDidAnimate={() => { hasAnimated.current = true; }}
      style={styles.wrapper}
    >
      {/* Delete circle — only visible when card is swiped left */}
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        pointerEvents={isRevealed ? "auto" : "none"}
        style={[styles.deleteCircle, { backgroundColor: colors.danger }]}
      >
        <TrashIcon size={16} color="#FFF" />
      </TouchableOpacity>

      <GestureDetector gesture={pan}>
        <Animated.View style={cardStyle}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isRevealed) { snapBack(); return; }
              onToggle(task.id);
            }}
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.14,
                shadowRadius: 10,
                elevation: 3,
              },
            ]}
          >
            {/* Colored tint overlay — opaque surface + theme color tint */}
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: task.color + "28", borderRadius: 14 },
              ]}
            />

            <View style={styles.inner}>
              <View style={styles.body}>
                <View style={styles.titleRow}>
                  <Text style={styles.themeEmoji}>{themeEmoji}</Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.title,
                      {
                        color: colors.text,
                        fontFamily: fonts.semiBold,
                        textDecorationLine: isCompleted ? "line-through" : "none",
                        opacity: isCompleted ? 0.45 : 1,
                      },
                    ]}
                  >
                    {task.title}
                  </Text>
                </View>
                <View style={styles.meta}>
                  <View style={[styles.metaDot, { backgroundColor: task.color }]} />
                  <Text style={[styles.metaText, { color: task.color, fontFamily: fonts.semiBold }]}>
                    {task.category}
                  </Text>
                  <View style={[styles.metaDot, { backgroundColor: priorityColor, marginLeft: 2 }]} />
                  <Text style={[styles.metaText, { color: priorityColor, fontFamily: fonts.regular }]}>
                    {task.priority}
                  </Text>
                  {task.duration ? (
                    <Text style={[styles.metaText, { color: colors.textMuted, fontFamily: fonts.regular }]}>
                      · {task.duration}
                    </Text>
                  ) : null}
                </View>
              </View>

              {/* Status indicator — only visible when completed */}
              <TouchableOpacity
                onPress={() => {
                  if (isRevealed) { snapBack(); return; }
                  onToggle(task.id);
                }}
                style={styles.checkBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {isCompleted && (
                  <View style={styles.checkDone}>
                    <CheckIcon size={10} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </MotiView>
  );
}

export const SwipeableTaskCard = memo(SwipeableTaskCardComponent);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 6,
    position: "relative",
  },
  deleteCircle: {
    position: "absolute",
    right: 8,
    top: "50%",
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 14,
    flexDirection: "row",
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  body: {
    flex: 1,
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  themeEmoji: {
    fontSize: 15,
    lineHeight: 18,
  },
  title: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  checkDone: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
});

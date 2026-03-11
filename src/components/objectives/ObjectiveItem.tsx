import { useTheme } from "@/src/hooks/useTheme";
import { Objective } from "@/src/types/objective";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface ObjectiveItemProps {
  objective: Objective;
  index: number;
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_GAP = 2;
const H_PADDING = 2;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH;

// Diagonal arrow icon
const ArrowUpRight = ({ color = "#1C1C1E", size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DRAG_AREA = CARD_WIDTH - 32;

export function ObjectiveItem({ objective, index, onUpdateProgress }: ObjectiveItemProps) {
  const { fonts } = useTheme();
  const progress = useSharedValue(objective.progress);
  const isCompleted = useSharedValue(objective.completed);

  React.useEffect(() => {
    progress.value = withTiming(objective.progress);
    isCompleted.value = objective.completed;
  }, [objective.progress, objective.completed]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (isCompleted.value) return;
      progress.value = Math.max(0, Math.min(1, progress.value + event.changeX / DRAG_AREA));
    })
    .onEnd(() => {
      const done = progress.value >= 0.99;
      if (done) progress.value = withSpring(1);
      runOnJS(onUpdateProgress)(objective.id, progress.value, done);
    });

  const isUrgent = objective.daysLeft <= 7;
  const pct = Math.round(objective.progress * 100);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: index * 70, damping: 18, stiffness: 180 }}
      style={[
        styles.card,
        { backgroundColor: objective.color || "#E8E4F4" },
        objective.completed && styles.cardDone,
      ]}
    >
      {/* Title */}
      <Text
        style={[styles.title, { fontFamily: fonts.bold }]}
        numberOfLines={3}
      >
        {objective.title}
      </Text>

      {/* Emoji illustration */}
      {objective.image ? (
        <Text style={styles.emoji}>{objective.image}</Text>
      ) : null}

      {/* Bottom row: progress % + arrow button */}
      <View style={styles.bottom}>
        <GestureDetector gesture={pan}>
          <Animated.View>
            <Text style={[styles.pct, { fontFamily: fonts.bold }]}>
              {pct}%
            </Text>
          </Animated.View>
        </GestureDetector>

        <View style={[styles.arrowBtn, { backgroundColor: "rgba(255,255,255,0.65)" }]}>
          <ArrowUpRight color="#1C1C1E" size={20} />
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 32,
    padding: 16,
    justifyContent: "space-between",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  cardDone: {
    opacity: 0.55,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    color: "#1C1C1E",
    maxWidth: "80%",
  },
  daysBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 14,
  },
  daysText: {
    fontSize: 11,
  },
  emoji: {
    position: "absolute",
    bottom: 44,
    right: 10,
    fontSize: 48,
    lineHeight: 56,
    opacity: 0.85,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pct: {
    fontSize: 14,
  },
  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

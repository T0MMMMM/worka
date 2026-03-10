import { Objective } from "@/src/types/objective";
import { CheckCircle } from "@/src/components/ui/Icons";
import { ProgressRing } from "@/src/components/ui/ProgressRing";
import { useTheme } from "@/src/hooks/useTheme";
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

interface ObjectiveItemProps {
  objective: Objective;
  index: number;
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAG_AREA_WIDTH = SCREEN_WIDTH - 40 - 32;

export function ObjectiveItem({ objective, index, onUpdateProgress }: ObjectiveItemProps) {
  const { colors, fonts } = useTheme();
  const progress = useSharedValue(objective.progress);
  const isCompleted = useSharedValue(objective.completed);

  React.useEffect(() => {
    progress.value = withTiming(objective.progress);
    isCompleted.value = objective.completed;
  }, [objective.progress, objective.completed]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (isCompleted.value) return;
      let next = progress.value + event.changeX / DRAG_AREA_WIDTH;
      progress.value = Math.max(0, Math.min(1, next));
    })
    .onEnd(() => {
      const done = progress.value >= 0.99;
      if (done) progress.value = withSpring(1);
      runOnJS(onUpdateProgress)(objective.id, progress.value, done);
    });

  const isUrgent = objective.daysLeft <= 7;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350, delay: index * 50 }}
      style={[styles.card, { backgroundColor: colors.surface }, objective.completed && styles.cardCompleted]}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.titleRow}>
          <View style={[styles.accentDot, { backgroundColor: objective.accent }]} />
          <Text
            style={[
              styles.title,
              { color: colors.text, fontFamily: fonts.semiBold },
              objective.completed && { textDecorationLine: "line-through", color: colors.textSecondary },
            ]}
            numberOfLines={1}
          >
            {objective.title}
          </Text>
        </View>
        <View style={[styles.daysBadge, { backgroundColor: isUrgent ? colors.warningSoft : colors.elevated }]}>
          <Text style={[styles.daysText, { color: isUrgent ? colors.warning : colors.textSecondary, fontFamily: fonts.bold }]}>
            {objective.daysLeft}j
          </Text>
        </View>
      </View>

      {/* Progress Ring */}
      <GestureDetector gesture={pan}>
        <Animated.View style={styles.ringContainer}>
          <ProgressRing
            size={100}
            strokeWidth={8}
            progress={progress}
            color={objective.accent}
            bgColor={colors.elevated}
          >
            {objective.completed ? (
              <CheckCircle size={24} color={colors.success} />
            ) : (
              <Text style={[styles.ringPercent, { color: objective.accent, fontFamily: fonts.bold }]}>
                {Math.round(objective.progress * 100)}%
              </Text>
            )}
          </ProgressRing>
        </Animated.View>
      </GestureDetector>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        {objective.completed ? (
          <View style={styles.completedRow}>
            <CheckCircle size={14} color={colors.success} />
            <Text style={[styles.completedText, { color: colors.success, fontFamily: fonts.semiBold }]}>
              Terminé
            </Text>
          </View>
        ) : (
          <Text style={[styles.progressText, { color: colors.text, fontFamily: fonts.bold }]}>
            {Math.round(objective.progress * 100)}%
          </Text>
        )}
        <View style={[styles.progressLabel, { backgroundColor: objective.accent + "10" }]}>
          <Text style={[styles.progressLabelText, { color: objective.accent, fontFamily: fonts.semiBold }]}>
            {objective.completed ? "100%" : `${Math.round(objective.progress * 100)}% complété`}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardCompleted: {
    opacity: 0.45,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 12,
  },
  accentDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  daysBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  daysText: {
    fontSize: 12,
  },
  ringContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  ringPercent: {
    fontSize: 18,
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressText: {
    fontSize: 20,
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  completedText: {
    fontSize: 14,
  },
  progressLabel: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  progressLabelText: {
    fontSize: 12,
  },
});

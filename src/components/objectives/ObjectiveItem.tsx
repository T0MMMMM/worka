import { CheckCircle } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export interface Objective {
  id: string;
  title: string;
  progress: number;
  color: string;
  accent: string;
  daysLeft: number;
  completed: boolean;
}

interface ObjectiveItemProps {
  objective: Objective;
  index: number;
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// Width calculation for the progress bar: screen width - list padding (20*2) - marker width area (~35) - content padding
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH - 40 - 30 - 20;

export function ObjectiveItem({
  objective,
  index,
  onUpdateProgress,
}: ObjectiveItemProps) {
  const progress = useSharedValue(objective.progress);
  const isCompleted = useSharedValue(objective.completed);

  // Sync prop changes
  React.useEffect(() => {
    progress.value = withTiming(objective.progress);
    isCompleted.value = objective.completed;
  }, [objective.progress, objective.completed]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (isCompleted.value) return;

      let newProgress = progress.value + event.changeX / PROGRESS_BAR_WIDTH;
      if (newProgress < 0) newProgress = 0;
      if (newProgress > 1) newProgress = 1;

      progress.value = newProgress;
    })
    .onEnd(() => {
      const finalProgress = progress.value;
      const completed = finalProgress >= 0.99; // Threshold for 100%

      if (completed) {
        progress.value = withSpring(1);
      }

      runOnJS(onUpdateProgress)(objective.id, finalProgress, completed);
    });

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: objective.accent,
  }));

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400, delay: index * 100 }}
      style={styles.objectiveItem}
    >
      <View style={styles.container}>
        {/* Marker / Dot */}
        <View style={styles.markerContainer}>
          <View
            style={[
              styles.markerSimpleDot,
              { backgroundColor: objective.accent },
              objective.completed && styles.markerDotCompleted,
            ]}
          />
        </View>

        {/* Content */}
        <View
          style={[
            styles.objectiveContent,
            objective.completed && styles.contentCompleted,
          ]}
        >
          <View style={styles.objectiveMainRow}>
            {/* Title & Days */}
            <View style={styles.objectiveHeaderMain}>
              <Text
                style={[
                  styles.objectiveTitle,
                  objective.completed && styles.titleCompleted,
                ]}
                numberOfLines={1}
              >
                {objective.title}
              </Text>
              <Text style={styles.objectiveDays}>{objective.daysLeft}j</Text>
            </View>

            {/* Progress Bar (Interactive) */}
            <GestureDetector gesture={pan}>
              <View style={styles.touchableArea}>
                <View style={styles.progressBarBg}>
                  <Animated.View
                    style={[
                      styles.progressBarFill,
                      animatedProgressStyle
                    ]}
                  />
                </View>
              </View>
            </GestureDetector>

            {/* Percentage Text or Check Icon */}
            <View style={styles.statusRow}>
              {objective.completed ? (
                <CheckCircle size={16} color="#4CAF50" />
              ) : (
                <Text style={styles.progressPercent}>
                  {Math.round(objective.progress * 100)}% complété
                </Text>
              )}
            </View>

          </View>
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  objectiveItem: {
    marginBottom: 25,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  markerContainer: {
    width: 12,
    marginTop: 6,
    marginRight: 15,
    marginLeft: 4,
    alignItems: "center",
  },
  markerSimpleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  markerDotCompleted: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  objectiveContent: {
    flex: 1,
    paddingRight: 10,
  },
  contentCompleted: {
    opacity: 0.5,
  },
  objectiveMainRow: {
    flex: 1,
  },
  objectiveHeaderMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  objectiveTitle: {
    fontSize: 17,
    fontFamily: theme.fonts.urbanistSemiBold,
    color: theme.colors.text,
    flex: 1,
    marginRight: 10,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
  },
  objectiveDays: {
    fontSize: 12,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.textSecondary,
  },
  touchableArea: {
    paddingVertical: 5, // Increase touch target
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  statusRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 12,
    fontFamily: theme.fonts.urbanistBold,
    color: "#888",
  },
});

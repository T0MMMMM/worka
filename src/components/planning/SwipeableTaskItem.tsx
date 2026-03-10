import { CheckCircle, X } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import * as Haptics from "expo-haptics";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Task } from "@/src/types/task";
import { TaskItem } from "./TaskItem";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 80;

interface SwipeableTaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDrag?: () => void;
  isActive?: boolean;
}

export function SwipeableTaskItem({ task, index, onToggle, onDelete, onDrag, isActive }: SwipeableTaskItemProps) {
  const { colors } = useTheme();
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue<number | null>(null);

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onToggle(task.id);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(task.id);
  };

  const longPress = Gesture.LongPress()
    .minDuration(400)
    .onStart(() => {
      if (onDrag) runOnJS(onDrag)();
    });

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 });
        runOnJS(handleComplete)();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 });
        runOnJS(handleDelete)();
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      }
    });

  const composed = Gesture.Race(pan, longPress);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const leftActionStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 20 ? Math.min(translateX.value / SWIPE_THRESHOLD, 1) : 0,
  }));

  const rightActionStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -20 ? Math.min(-translateX.value / SWIPE_THRESHOLD, 1) : 0,
  }));

  return (
    <View
      style={styles.wrapper}
      onLayout={(e) => {
        itemHeight.value = e.nativeEvent.layout.height;
      }}
    >
      {/* Left action: complete */}
      <Animated.View style={[styles.actionLeft, leftActionStyle]}>
        <View style={[styles.actionCircle, { backgroundColor: colors.success }]}>
          <CheckCircle size={20} color="#FFF" />
        </View>
      </Animated.View>

      {/* Right action: delete */}
      <Animated.View style={[styles.actionRight, rightActionStyle]}>
        <View style={[styles.actionCircle, { backgroundColor: colors.danger }]}>
          <X size={20} color="#FFF" />
        </View>
      </Animated.View>

      {/* Card */}
      <GestureDetector gesture={composed}>
        <Animated.View style={[cardStyle, isActive && { opacity: 0.9, transform: [{ scale: 1.02 }] }]}>
          <TaskItem task={task} index={index} onToggle={onToggle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  actionLeft: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  actionRight: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  actionCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

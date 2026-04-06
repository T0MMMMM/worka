import { useTheme } from "@/src/hooks/useTheme";
import { Objective } from "@/src/types/objective";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  SharedValue,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface ObjectiveItemProps {
  objective: Objective;
  index: number;
  onUpdateProgress: (id: string, progress: number, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_GAP = 2;
const H_PADDING = 2;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH;

const BUBBLE_SIZE = 52;
const WAVE_HEIGHT = 6;

const AnimatedPath = Animated.createAnimatedComponent(Path);

function LiquidBubble({
  progress,
  accentColor,
}: {
  progress: SharedValue<number>;
  accentColor: string;
}) {
  const waveOffset = useSharedValue(0);

  React.useEffect(() => {
    waveOffset.value = withRepeat(
      withTiming(BUBBLE_SIZE, { duration: 2800, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const fillStyle = useAnimatedStyle(() => ({
    height: progress.value * BUBBLE_SIZE,
  }));

  const waveProps = useAnimatedProps(() => {
    const fillY = BUBBLE_SIZE - progress.value * BUBBLE_SIZE;
    const x = waveOffset.value;
    const w = BUBBLE_SIZE;
    const h = WAVE_HEIGHT;
    const d =
      `M${x - w} ${fillY} ` +
      `Q${x - w * 0.75} ${fillY - h} ${x - w * 0.5} ${fillY} ` +
      `Q${x - w * 0.25} ${fillY + h} ${x} ${fillY} ` +
      `Q${x + w * 0.25} ${fillY - h} ${x + w * 0.5} ${fillY} ` +
      `Q${x + w * 0.75} ${fillY + h} ${x + w} ${fillY} ` +
      `L${x + w} ${BUBBLE_SIZE} L${x - w} ${BUBBLE_SIZE} Z`;
    return { d };
  });

  return (
    <View style={[styles.bubble, { backgroundColor: accentColor + "28" }]}>
      <Animated.View
        style={[styles.bubbleFill, { backgroundColor: accentColor + "55" }, fillStyle]}
      />
      <Svg width={BUBBLE_SIZE} height={BUBBLE_SIZE} style={StyleSheet.absoluteFill}>
        <AnimatedPath animatedProps={waveProps} fill={accentColor + "88"} />
      </Svg>
    </View>
  );
}

const DRAG_AREA = CARD_WIDTH - 32;

export function ObjectiveItem({ objective, index, onUpdateProgress, onDelete }: ObjectiveItemProps) {
  const { fonts, colors } = useTheme();
  const progress = useSharedValue(objective.progress);
  const isCompleted = useSharedValue(objective.completed);

  React.useEffect(() => {
    progress.value = withTiming(objective.progress, { duration: 600 });
    isCompleted.value = objective.completed;
  }, [objective.progress, objective.completed]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (isCompleted.value) return;
      progress.value = Math.max(0, Math.min(1, progress.value + event.changeX / DRAG_AREA));
    })
    .onEnd(() => {
      const done = progress.value >= 0.99;
      runOnJS(onUpdateProgress)(objective.id, progress.value, done);
    });

  const handlePress = () => {
    if (objective.completed) return;
    const next = Math.min(1, objective.progress + 0.1);
    onUpdateProgress(objective.id, next, next >= 0.99);
  };

  const handleLongPress = () => {
    progress.value = withTiming(0, { duration: 400 });
    onUpdateProgress(objective.id, 0, false);
  };

  const accentColor = objective.accent ?? "#7B6FCC";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={600}
    >
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
        <TouchableOpacity
          onPress={() => onDelete(objective.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          style={styles.deleteBtn}
        >
          <Svg width={14} height={14} viewBox="0 0 24 24">
            <Path d="M18 6L6 18M6 6l12 12" stroke={colors.danger} strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>

        <Text
          style={[styles.title, { fontFamily: fonts.bold, color: colors.text }]}
          numberOfLines={3}
        >
          {objective.title}
        </Text>

        {objective.image ? (
          <Text style={styles.emoji}>{objective.image}</Text>
        ) : null}

        <View style={styles.bottom}>
          <GestureDetector gesture={pan}>
            <Animated.View>
              <Text style={[styles.pct, { fontFamily: fonts.bold, color: colors.text }]}>
                {Math.round(objective.progress * 100)}%
              </Text>
            </Animated.View>
          </GestureDetector>

          <View style={[styles.bubbleWrapper, { backgroundColor: colors.cardOverlay }]}>
            <LiquidBubble progress={progress} accentColor={accentColor} />
          </View>
        </View>
      </MotiView>
    </TouchableOpacity>
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
  deleteBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    maxWidth: "80%",
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
  bubbleWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bubbleFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

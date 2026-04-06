import { useThemeStore } from "@/src/store/themeStore";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ModalSheetProps {
  children: React.ReactNode;
  maxHeightRatio?: number;
  overlayColor?: string;
}

export function ModalSheet({
  children,
  maxHeightRatio = 0.85,
  overlayColor = "rgba(0,0,0,0)",
}: ModalSheetProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const isDark = mode === "dark";

  const translateY = useSharedValue(0);

  const dismiss = () => router.back();

  // Gesture only on the handle area — no conflict with inner ScrollView
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100 || e.velocityY > 600) {
        runOnJS(dismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      }
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: overlayColor }]}>
      <Animated.View
        style={[
          styles.shell,
          {
            maxHeight: SCREEN_HEIGHT * maxHeightRatio,
            shadowColor: isDark ? colors.accent : "#000",
          },
          animStyle,
        ]}
      >
        <BlurView
          intensity={isDark ? 35 : 40}
          tint="default"
          style={styles.blur}
        >
          <View
            style={[
              styles.glassOverlay,
              {
                backgroundColor: isDark
                  ? "rgba(20,16,10,0.72)"
                  : "rgba(255, 255, 255, 0.65)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.8)",
              },
            ]}
          />

          {/* Drag handle — only this area triggers the swipe gesture */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.handleArea}>
              <View style={[styles.handle, { backgroundColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }]} />
            </View>
          </GestureDetector>

          {children}
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  shell: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    flex: 1,
    overflow: "hidden",
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 12,
  },
  blur: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: "hidden",
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
  },
  handleArea: {
    width: "100%",
    paddingTop: 16,
    paddingBottom: 10,
    alignItems: "center",
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
  },
});

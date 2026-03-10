import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function FlameIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22c4.97 0 8-3.03 8-8 0-2.52-1.02-5.09-2.54-7.17a1 1 0 0 0-1.63.12L14 10l-2.26-4.52a1 1 0 0 0-1.72-.13C8.03 8.2 4 13.06 4 14c0 4.97 3.03 8 8 8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface StreakIndicatorProps {
  streak: number;
}

export function StreakIndicator({ streak }: StreakIndicatorProps) {
  const { colors, fonts } = useTheme();
  if (streak <= 0) return null;

  return (
    <View style={[styles.badge, { backgroundColor: colors.warningSoft }]}>
      <FlameIcon size={10} color={colors.warning} />
      <Text style={[styles.text, { color: colors.warning, fontFamily: fonts.bold }]}>
        {streak}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  text: {
    fontSize: 10,
  },
});

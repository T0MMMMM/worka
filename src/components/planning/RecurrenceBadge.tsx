import { useTheme } from "@/src/hooks/useTheme";
import { RecurrenceRule } from "@/src/types/task";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function RepeatIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const FREQUENCY_LABELS: Record<RecurrenceRule["frequency"], string> = {
  daily: "Quotidien",
  weekly: "Hebdo",
  monthly: "Mensuel",
};

interface RecurrenceBadgeProps {
  recurrence: RecurrenceRule;
}

export function RecurrenceBadge({ recurrence }: RecurrenceBadgeProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
      <RepeatIcon size={10} color={colors.accent} />
      <Text style={[styles.text, { color: colors.accent, fontFamily: fonts.bold }]}>
        {FREQUENCY_LABELS[recurrence.frequency]}
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

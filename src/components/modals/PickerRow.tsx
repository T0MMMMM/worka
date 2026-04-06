import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PickerRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function PickerRow({ label, value, icon, onPress }: PickerRowProps) {
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const isDark = mode === "dark";

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.row,
          {
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.45)",
          },
        ]}
      >
        {icon}
        <Text style={[styles.value, { color: colors.text, fontFamily: fonts.bold }]}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    gap: 10,
  },
  value: {
    fontSize: 18,
  },
});

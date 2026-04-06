import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ChoiceOption<T = string> {
  label: string;
  value: T;
  activeColor?: string;
  icon?: React.ReactNode;
}

interface ChoicePickerProps<T = string> {
  label: string;
  options: ChoiceOption<T>[];
  selected: T;
  onSelect: (option: ChoiceOption<T>) => void;
}

export function ChoicePicker<T>({ label, options, selected, onSelect }: ChoicePickerProps<T>) {
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const isDark = mode === "dark";

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
        {label}
      </Text>
      <View style={styles.row}>
        {options.map((opt, i) => {
          const active = selected === opt.value;
          const activeColor = opt.activeColor ?? colors.accent;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => onSelect(opt)}
              activeOpacity={0.75}
              style={[
                styles.pill,
                active
                  ? { backgroundColor: activeColor, borderColor: activeColor }
                  : {
                      backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.45)",
                    },
              ]}
            >
              {opt.icon && (
                <View style={styles.iconSlot}>{opt.icon}</View>
              )}
              <Text
                style={[
                  styles.pillText,
                  {
                    color: active ? "#FFFFFF" : colors.textMuted,
                    fontFamily: active ? fonts.bold : fonts.regular,
                  },
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    gap: 6,
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 50,
    borderWidth: 1,
    gap: 5,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    fontSize: 14,
  },
});

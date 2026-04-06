import { Check } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ModalFABProps {
  onPress: () => void;
}

export function ModalFAB({ onPress }: ModalFABProps) {
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const insets = useSafeAreaInsets();
  const isDark = mode === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.fab,
        {
          backgroundColor: colors.accent,
          bottom: Math.max(insets.bottom, 16) + 20,
          shadowColor: isDark ? colors.accent : "#000",
        },
      ]}
    >
      <Check size={26} color={isDark ? colors.bg : "#FFFFFF"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 28,
    width: 68,
    height: 68,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 100,
  },
});

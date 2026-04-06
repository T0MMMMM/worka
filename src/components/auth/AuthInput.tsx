import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
}

export function AuthInput({ label, style, ...props }: AuthInputProps) {
  const { colors, fonts } = useTheme();
  const isDark = useThemeStore((s) => s.mode) === "dark";

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
            borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.45)",
            color: colors.text,
            fontFamily: fonts.regular,
          },
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    height: 56,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
  },
});

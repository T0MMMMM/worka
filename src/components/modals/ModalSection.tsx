import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface ModalSectionProps {
  label: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ModalSection({ label, children, style }: ModalSectionProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
        {label}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});

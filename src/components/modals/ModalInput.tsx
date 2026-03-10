import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface ModalInputProps extends TextInputProps {
  label: string;
}

export function ModalInput({ label, style, ...props }: ModalInputProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.bg,
            color: colors.text,
            borderColor: colors.border,
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
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
  },
});

import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
}

export function AuthInput({ label, ...props }: AuthInputProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.elevated,
            color: colors.text,
            borderColor: colors.border,
            fontFamily: fonts.regular,
          },
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  input: {
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
  },
});

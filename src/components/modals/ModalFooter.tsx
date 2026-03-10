import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalFooterProps {
  onPress: () => void;
  label: string;
}

export function ModalFooter({ onPress, label }: ModalFooterProps) {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 10 }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={[styles.buttonText, { fontFamily: fonts.bold }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: 16,
  },
  button: {
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
  },
});

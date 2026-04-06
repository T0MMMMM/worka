import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ModalHeaderProps {
  title: string;
}

export function ModalHeader({ title }: ModalHeaderProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 20,
  },
});

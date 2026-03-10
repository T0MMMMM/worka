import { Plus } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PageHeaderProps {
  title: string;
  onPlusPress?: () => void;
  showPlus?: boolean;
}

export function PageHeader({ title, onPlusPress, showPlus = true }: PageHeaderProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>{title}</Text>
      {showPlus && onPlusPress && (
        <TouchableOpacity
          style={[styles.plusButton, { backgroundColor: colors.surface }]}
          activeOpacity={0.7}
          onPress={onPlusPress}
        >
          <Plus size={20} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});

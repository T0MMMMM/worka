import { ChevronRight } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
  labelColor?: string;
}

export function MenuItem({ icon, label, onPress, showChevron = true, labelColor }: MenuItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        {icon}
        <Text
          style={[
            styles.label,
            { fontFamily: fonts.semiBold, color: labelColor ?? colors.text },
          ]}
        >
          {label}
        </Text>
      </View>
      {showChevron && <ChevronRight size={18} color={colors.textMuted} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  label: {
    fontSize: 16,
  },
});

import { ChevronRight } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
  labelColor?: string;
}

export function MenuItem({
  icon,
  label,
  onPress,
  showChevron = true,
  labelColor,
}: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={[styles.menuText, labelColor && { color: labelColor }]}>
          {label}
        </Text>
      </View>
      {showChevron && <ChevronRight size={18} color="#CCC" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 20,
    borderRadius: 24,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuText: {
    fontSize: 17,
    fontFamily: theme.fonts.urbanistSemiBold,
    color: theme.colors.onPrimary,
  },
});

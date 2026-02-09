import { Plus } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PageHeaderProps {
  title: string;
  onPlusPress?: () => void;
  showPlus?: boolean;
}

export function PageHeader({
  title,
  onPlusPress,
  showPlus = true,
}: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {showPlus && onPlusPress && (
        <TouchableOpacity
          style={styles.plusButtonOuter}
          activeOpacity={0.7}
          onPress={onPlusPress}
        >
          <View style={styles.plusButtonBlur}>
            <Plus size={20} color={theme.colors.onPrimary} />
          </View>
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
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: theme.fonts.urbanistBold,
    textTransform: "capitalize",
    color: theme.colors.onPrimary,
  },
  plusButtonOuter: {
    borderRadius: 100,
    width: 38,
    height: 38,
    overflow: "hidden",
  },
  plusButtonBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});

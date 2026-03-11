import { Plus } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onPlusPress?: () => void;
  showPlus?: boolean;
}

export function PageHeader({ title, subtitle, onPlusPress, showPlus = true }: PageHeaderProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.header}>
      <View>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            {subtitle}
          </Text>
        )}
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.extraBold }]}>{title}</Text>
      </View>
      {showPlus && onPlusPress && (
        <TouchableOpacity
          style={[styles.plusButton, { backgroundColor: colors.text }]}
          activeOpacity={0.8}
          onPress={onPlusPress}
        >
          <Plus size={20} color={colors.bg} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
});

import { X } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  icon?: React.ReactNode;
}

export function ModalHeader({ title, onClose, icon }: ModalHeaderProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        {icon && <View style={[styles.iconBox, { backgroundColor: colors.accentSoft }]}>{icon}</View>}
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: colors.elevated }]}>
        <X size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

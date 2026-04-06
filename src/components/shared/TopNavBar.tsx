import { Plus, UserCircle } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useUserStore } from "@/src/store/userStore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TopNavBarProps {
  onProfile: () => void;
  onAdd: () => void;
}

export function TopNavBar({ onProfile, onAdd }: TopNavBarProps) {
  const { colors, fonts } = useTheme();
  const { name, avatarUrl, isLoggedIn } = useUserStore();

  const initials = isLoggedIn && name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : null;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}
        onPress={onProfile}
        activeOpacity={0.7}
      >
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : initials ? (
          <Text style={[styles.initials, { color: colors.accent, fontFamily: fonts.bold }]}>
            {initials}
          </Text>
        ) : (
          <UserCircle size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.addBtn, { backgroundColor: colors.text }]}
        onPress={onAdd}
        activeOpacity={0.8}
      >
        <Plus size={18} color={colors.bg} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  addBtn: {
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  initials: {
    fontSize: 15,
  },
});

import { Clock, LogOut, Settings } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MenuItem } from "./MenuItem";

interface MenuContainerProps {
  onSettingsPress?: () => void;
  onLogoutPress?: () => void;
  onArchivePress?: () => void;
}

export function MenuContainer({ onSettingsPress, onLogoutPress, onArchivePress }: MenuContainerProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MenuItem
        icon={<Clock size={20} color={colors.textSecondary} />}
        label="Archives"
        onPress={onArchivePress}
      />
      <MenuItem
        icon={<Settings size={20} color={colors.textSecondary} />}
        label="Paramètres"
        onPress={onSettingsPress}
      />
      <MenuItem
        icon={<LogOut size={20} color={colors.danger} />}
        label="Déconnexion"
        onPress={onLogoutPress}
        showChevron={false}
        labelColor={colors.danger}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 10,
  },
});

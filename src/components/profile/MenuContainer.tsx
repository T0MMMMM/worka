import { LogOut, Settings } from "@/src/components/ui/Icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MenuItem } from "./MenuItem";

interface MenuContainerProps {
  onSettingsPress?: () => void;
  onLogoutPress?: () => void;
}

export function MenuContainer({
  onSettingsPress,
  onLogoutPress,
}: MenuContainerProps) {
  return (
    <View style={styles.menuContainer}>
      <MenuItem
        icon={<Settings size={20} color="#666" />}
        label="Paramètres"
        onPress={onSettingsPress}
      />
      <View style={styles.menuSpacer} />
      <MenuItem
        icon={<LogOut size={20} color="#FF6B6B" />}
        label="Déconnexion"
        onPress={onLogoutPress}
        showChevron={false}
        labelColor="#FF6B6B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  menuSpacer: {
    height: 10,
  },
});

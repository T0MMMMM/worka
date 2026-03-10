import {
  MenuContainer,
  ProfileHeader,
  StatsContainer,
} from "@/src/components/profile";
import { GradientPageLayout } from "@/src/components/shared";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const USER_DATA = {
  name: "Thomas Delon",
  email: "thomas.d@worka.io",
};

const STATS_DATA = {
  tasksCompleted: 128,
  objectivesReached: 12,
  productivity: 94,
};

export default function Profile() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const handleSettings = () => {};
  const handleLogout = () => {};
  const handleArchive = () => router.push("/modals/archive");

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileHeader name={USER_DATA.name} email={USER_DATA.email} />
          <StatsContainer stats={STATS_DATA} />

          <View style={[styles.themeRow, { backgroundColor: colors.surface }]}>
            <Text style={[styles.themeLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
              Mode sombre
            </Text>
            <ThemeToggle />
          </View>

          <TouchableOpacity
            style={[styles.themeRow, { backgroundColor: colors.surface }]}
            onPress={() => router.push("/modals/theme-picker")}
            activeOpacity={0.7}
          >
            <Text style={[styles.themeLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
              Couleur d'accent
            </Text>
            <View style={[styles.accentDot, { backgroundColor: colors.accent }]} />
          </TouchableOpacity>

          <MenuContainer
            onSettingsPress={handleSettings}
            onLogoutPress={handleLogout}
            onArchivePress={handleArchive}
          />
        </ScrollView>
      </GradientPageLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  themeLabel: {
    fontSize: 16,
  },
  accentDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

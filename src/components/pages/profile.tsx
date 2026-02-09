import {
  MenuContainer,
  ProfileHeader,
  StatsContainer,
} from "@/src/components/profile";
import { GradientPageLayout } from "@/src/components/shared";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
  const handleSettings = () => {
    // TODO: Navigate to settings
  };

  const handleLogout = () => {
    // TODO: Handle logout
  };

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileHeader name={USER_DATA.name} email={USER_DATA.email} />
          <StatsContainer stats={STATS_DATA} />
          <MenuContainer
            onSettingsPress={handleSettings}
            onLogoutPress={handleLogout}
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
});

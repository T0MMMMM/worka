import { ObjectivesList } from "@/src/components/objectives";
import { GradientPageLayout } from "@/src/components/shared";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

// Search icon
const SearchIcon = ({ size = 20, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// User circle icon for profile button
const UserIcon = ({ size = 22, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" stroke={color} strokeWidth="1.8" />
    <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" stroke={color} strokeWidth="1.8" />
    <Path d="M6.168 18.849a4 4 0 0 1 3.832-2.849h4a4 4 0 0 1 3.834 2.855" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Objectives() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const objectives = useObjectiveStore((s) => s.objectives);
  const updateProgress = useObjectiveStore((s) => s.updateProgress);

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        {/* Top nav */}
        <View style={styles.topNav}>
          {/* Profile button top-left */}
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "rgba(255,255,255,0.6)" }]}
            onPress={() => router.push("/(tabs)/profile")}
            activeOpacity={0.7}
          >
            <UserIcon size={20} color={colors.text} />
          </TouchableOpacity>

          {/* Add/Search button top-right */}
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "rgba(255,255,255,0.6)" }]}
            onPress={() => router.push("/modals/add-objective")}
            activeOpacity={0.7}
          >
            <SearchIcon size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero section */}
          <View style={styles.heroSection}>
            <Text
              style={[styles.heroLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}
            >
              Objectifs
            </Text>
            <Text style={[styles.heroTitle, { color: colors.text }]}>
              <Text style={{ fontFamily: fonts.light }}>Atteignez{"\n"}vos </Text>
              <Text style={{ fontFamily: fonts.extraBold }}>objectifs</Text>
            </Text>
          </View>

          {/* Cards grid */}
          <ObjectivesList
            objectives={objectives}
            onUpdateProgress={updateProgress}
          />

          <View style={styles.objectivesReview}>
            <Text style={{ fontFamily: fonts.extraBold }}>Votre rapport{"\n"}d'objectifs</Text>
              
          </View>
        </ScrollView>
      </GradientPageLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 26,
  },
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  heroSection: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 26,
  },
  heroLabel: {
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 38,
    lineHeight: 46,
  },
  objectivesReview: {
    borderRadius: 32,
    padding: 16,
    justifyContent: "space-between",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    marginTop: 2,
    marginHorizontal: 2,
    backgroundColor: "#f6f6f6",
    width: SCREEN_WIDTH - 4,
    height: SCREEN_WIDTH - 4,
  },
});

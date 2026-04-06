import { ObjectiveReport, ObjectivesList } from "@/src/components/objectives";
import { GradientPageLayout, TopNavBar } from "@/src/components/shared";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Objectives() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const objectives = useObjectiveStore((s) => s.objectives);
  const updateProgress = useObjectiveStore((s) => s.updateProgress);
  const deleteObjective = useObjectiveStore((s) => s.deleteObjective);

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top nav — scrolls with content */}
          <View style={styles.topNavWrapper}>
            <TopNavBar
              onProfile={() => router.push("/profile")}
              onAdd={() => router.push("/modals/add-objective")}
            />
          </View>

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
          <ObjectivesList objectives={objectives} onUpdateProgress={updateProgress} onDelete={deleteObjective} />

          {/* Rapport d'objectifs */}
          <ObjectiveReport objectives={objectives} />
        </ScrollView>
      </GradientPageLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topNavWrapper: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 26,
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
});

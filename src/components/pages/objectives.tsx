import { ObjectivesList, UrgentSection } from "@/src/components/objectives";
import { GradientPageLayout, PageHeader } from "@/src/components/shared";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Objectives() {
  const router = useRouter();
  const objectives = useObjectiveStore((s) => s.objectives);
  const updateProgress = useObjectiveStore((s) => s.updateProgress);

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <PageHeader
          title="Objectifs"
          onPlusPress={() => router.push("/modals/add-objective")}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <UrgentSection objectives={objectives} />
          <ObjectivesList
            objectives={objectives}
            onUpdateProgress={updateProgress}
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

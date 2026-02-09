import {
  Objective,
  ObjectivesList,
  UrgentSection,
} from "@/src/components/objectives";
import { GradientPageLayout, PageHeader } from "@/src/components/shared";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const INITIAL_OBJECTIVES: Objective[] = [
  {
    id: "1",
    title: "Apprendre React Native",
    progress: 0.75,
    color: "#2196F3",
    accent: "#2196F3",
    daysLeft: 12,
    completed: false,
  },
  {
    id: "2",
    title: "Lire 2 livres par mois",
    progress: 0.4,
    color: "#9C27B0",
    accent: "#9C27B0",
    daysLeft: 18,
    completed: false,
  },
  {
    id: "3",
    title: "Marathon de Paris",
    progress: 0.9,
    color: "#FF5252",
    accent: "#FF5252",
    daysLeft: 3,
    completed: false,
  },
];

export default function Objectives() {
  const router = useRouter();
  const [objectives, setObjectives] = useState<Objective[]>(INITIAL_OBJECTIVES);

  const updateObjectiveProgress = (id: string, progress: number, completed: boolean) => {
    setObjectives((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
            ...o,
            progress: completed ? 1 : progress,
            completed: completed,
          }
          : o,
      ),
    );
  };

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
          <ObjectivesList objectives={objectives} onUpdateProgress={updateObjectiveProgress} />
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

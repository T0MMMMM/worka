import { ModalHeader, ModalSheet } from "@/src/components/modals";
import { ArchivedObjectiveItem } from "@/src/components/archive/ArchivedObjectiveItem";
import { ArchivedTaskItem } from "@/src/components/archive/ArchivedTaskItem";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useTaskStore } from "@/src/store/taskStore";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ArchiveModal() {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const archivedTasks = useTaskStore((s) => s.archivedTasks);
  const archivedObjectives = useObjectiveStore((s) => s.archivedObjectives);

  const isEmpty = archivedTasks.length === 0 && archivedObjectives.length === 0;

  return (
    <ModalSheet>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        >
          <ModalHeader title="Archives" />
          {isEmpty && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.textMuted, fontFamily: fonts.regular }]}>
                Aucun élément archivé
              </Text>
            </View>
          )}

          {archivedTasks.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                Tâches
              </Text>
              {archivedTasks.map((task) => (
                <ArchivedTaskItem key={task.id} task={task} />
              ))}
            </>
          )}

          {archivedObjectives.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                Objectifs
              </Text>
              {archivedObjectives.map((obj) => (
                <ArchivedObjectiveItem key={obj.id} objective={obj} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 16,
    textAlign: "center",
  },
  empty: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
  },
});

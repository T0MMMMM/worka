import { ArchivedObjectiveItem } from "@/src/components/archive/ArchivedObjectiveItem";
import { ArchivedTaskItem } from "@/src/components/archive/ArchivedTaskItem";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ArchiveModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const archivedTasks = useTaskStore((s) => s.archivedTasks);
  const archivedObjectives = useObjectiveStore((s) => s.archivedObjectives);

  const isEmpty = archivedTasks.length === 0 && archivedObjectives.length === 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      <View style={[styles.modal, { maxHeight: SCREEN_HEIGHT * 0.95, backgroundColor: colors.surface }]}>
        <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
              Archives
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={[styles.closeText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
                Fermer
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          >
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
  },
  closeText: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 16,
  },
  empty: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
  },
});

import { BentoGrid } from "@/src/components/planning/BentoGrid";
import { TasksList } from "@/src/components/planning";
import { GradientPageLayout, PageHeader } from "@/src/components/shared";
import { Calendar } from "@/src/components/ui/Calendar";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Planning() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [selectedDate, setSelectedDate] = useState(moment());
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const reorderTasks = useTaskStore((s) => s.reorderTasks);

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <PageHeader
          title={capitalize(selectedDate.format("MMMM YYYY"))}
          onPlusPress={() => router.push("/modals/add-task")}
        />
        <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <BentoGrid />

          <View style={styles.content}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold }]}>
              Aujourd'hui
            </Text>
            <TasksList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onReorder={reorderTasks} />
          </View>
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
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
});

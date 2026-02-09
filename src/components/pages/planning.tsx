import { Task, TasksList } from "@/src/components/planning";
import { GradientPageLayout, PageHeader } from "@/src/components/shared";
import { Calendar } from "@/src/components/ui/Calendar";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/constants/theme";

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Appel client : Projet Worka",
    time: "10:00",
    duration: "30 min",
    status: "pending",
    category: "Travail",
    color: "#FF5722",
    priority: "high",
  },
  {
    id: "2",
    title: "Session Design System",
    time: "14:30",
    duration: "1h 30min",
    status: "completed",
    category: "Design",
    color: "#2196F3",
    priority: "medium",
  },
];

export default function Planning() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
          : t,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <PageHeader
          title={selectedDate.format("MMMM YYYY")}
          onPlusPress={() => router.push("/modals/add-task")}
        />

        <Calendar
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aujourd'hui</Text>
          </View>
          <TasksList tasks={tasks} onToggle={toggleTask} />
        </View>
      </GradientPageLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separatorContainer: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.onPrimary,
  },
});

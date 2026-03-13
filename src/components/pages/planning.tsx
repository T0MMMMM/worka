import { DayTimeline } from "@/src/components/planning/DayTimeline";
import { GradientPageLayout, TopNavBar } from "@/src/components/shared";
import { Calendar } from "@/src/components/ui/Calendar";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

moment.locale("fr");

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Planning() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [selectedDate, setSelectedDate] = useState(moment());
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        {/* Fixed header — does NOT scroll */}
        <View>
          <View style={styles.topNavWrapper}>
            <TopNavBar
              onProfile={() => router.push("/profile")}
              onAdd={() => router.push("/modals/add-task")}
            />
          </View>

          <View style={styles.heroSection}>
            <Text style={[styles.heroLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              Planning
            </Text>
            <Text style={[styles.heroTitle, { color: colors.text }]}>
              <Text style={{ fontFamily: fonts.light }}>
                {capitalize(selectedDate.format("MMMM"))}{" "}
              </Text>
              <Text style={{ fontFamily: fonts.extraBold }}>
                {selectedDate.format("YYYY")}
              </Text>
            </Text>
          </View>

          <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold }]}>
              Aujourd'hui
            </Text>
            <Text style={[styles.sectionCount, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* Timeline fills remaining space and scrolls internally */}
        <DayTimeline tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
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
  heroSection: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 4,
  },
  heroLabel: {
    fontSize: 13,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionCount: {
    fontSize: 13,
  },
});

import { DayTimeline } from "@/src/components/planning/DayTimeline";
import { GradientPageLayout } from "@/src/components/shared";
import { Calendar } from "@/src/components/ui/Calendar";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

moment.locale("fr");

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Plus icon
const PlusIcon = ({ size = 18, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// User icon for profile
const UserIcon = ({ size = 20, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" stroke={color} strokeWidth="1.8" />
    <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" stroke={color} strokeWidth="1.8" />
    <Path d="M6.168 18.849a4 4 0 0 1 3.832-2.849h4a4 4 0 0 1 3.834 2.855" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

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
        {/* Top nav */}
        <View style={styles.topNav}>
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "rgba(255,255,255,0.6)" }]}
            onPress={() => router.push("/(tabs)/profile")}
            activeOpacity={0.7}
          >
            <UserIcon size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: colors.text }]}
            onPress={() => router.push("/modals/add-task")}
            activeOpacity={0.8}
          >
            <PlusIcon size={18} color={colors.bg} />
          </TouchableOpacity>
        </View>

        {/* Hero: Month + Year on same line */}
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

        {/* Calendar strip */}
        <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

        {/* Section title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold }]}>
            Aujourd'hui
          </Text>
          <Text style={[styles.sectionCount, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
          </Text>
        </View>

        {/* Task timeline */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <DayTimeline tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
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
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
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
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionCount: {
    fontSize: 13,
  },
  scrollContent: {
    paddingBottom: 130,
  },
});

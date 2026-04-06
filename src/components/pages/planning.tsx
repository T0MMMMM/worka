import { DayTimeline, DayTimelineRef } from "@/src/components/planning/DayTimeline";
import { GradientPageLayout, TopNavBar } from "@/src/components/shared";
import { Calendar, CalendarRef } from "@/src/components/ui/Calendar";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

moment.locale("fr");

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Planning() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [selectedDate, setSelectedDate] = useState(moment());
  const calendarRef = useRef<CalendarRef>(null);
  const timelineRef = useRef<DayTimelineRef>(null);
  const allTasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const isToday = selectedDate.isSame(moment(), "day");
  const todayStr = moment().format("YYYY-MM-DD");
  const selectedStr = selectedDate.format("YYYY-MM-DD");

  // Tasks without a date are treated as today's tasks (legacy)
  const tasks = allTasks.filter((t) => (t.date ?? todayStr) === selectedStr);

  const goToToday = () => {
    const t = moment();
    setSelectedDate(t);
    calendarRef.current?.scrollToDate(t, true);
  };

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        <View>
          <View style={styles.topNavWrapper}>
            <TopNavBar
              onProfile={() => router.push("/profile")}
              onAdd={() => router.push({ pathname: "/modals/add-task", params: { date: selectedStr } })}
            />
          </View>

          <View style={styles.heroSection}>
            <Text style={[styles.heroLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              Planning
            </Text>
            <View style={styles.heroTitleRow}>
              <Text style={[styles.heroTitle, { color: colors.text }]}>
                <Text style={{ fontFamily: fonts.light }}>
                  {capitalize(selectedDate.format("MMMM"))}{" "}
                </Text>
                <Text style={{ fontFamily: fonts.extraBold }}>
                  {selectedDate.format("YYYY")}
                </Text>
              </Text>
              {!isToday && (
                <TouchableOpacity
                  onPress={goToToday}
                  activeOpacity={0.7}
                  style={[styles.todayBtn, { backgroundColor: colors.accentSoft }]}
                >
                  <Text style={[styles.todayBtnText, { color: colors.accent, fontFamily: fonts.semiBold }]}>
                    Aujourd'hui
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Calendar ref={calendarRef} selectedDate={selectedDate} onDateSelected={setSelectedDate} />

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold }]}>
              {isToday ? "Aujourd'hui" : capitalize(selectedDate.format("dddd D"))}
            </Text>
            <TouchableOpacity onPress={() => timelineRef.current?.scrollToNextTask()} activeOpacity={0.6}>
              <Text style={[styles.sectionCount, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <DayTimeline ref={timelineRef} tasks={tasks} isToday={isToday} onToggle={toggleTask} onDelete={deleteTask} />
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
  heroTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 40,
  },
  todayBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  todayBtnText: {
    fontSize: 13,
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

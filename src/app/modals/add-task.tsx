import {
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalSection,
} from "@/src/components/modals";
import {
  Clock,
  Flag,
} from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { useTaskThemeStore } from "@/src/store/taskThemeStore";
import { RecurrenceRule } from "@/src/types/task";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PRIORITIES = [
  { label: "Low",    color: "#22C55E", value: "low" },
  { label: "Medium", color: "#F59E0B", value: "medium" },
  { label: "High",   color: "#EF4444", value: "high" },
];

const RECURRENCE_OPTIONS: { label: string; value: RecurrenceRule["frequency"] | null }[] = [
  { label: "Aucune",    value: null },
  { label: "Quotidien", value: "daily" },
  { label: "Hebdo",     value: "weekly" },
  { label: "Mensuel",   value: "monthly" },
];

export default function AddTaskModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const themes = useTaskThemeStore((s) => s.themes);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[1] ?? themes[0]);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[1]);
  const [selectedRecurrence, setSelectedRecurrence] = useState(RECURRENCE_OPTIONS[0]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      <View style={[styles.modal, { maxHeight: SCREEN_HEIGHT * 0.95, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border }]}>
        <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />
        <View style={styles.content}>
          <ModalHeader
            title="Nouvelle tâche"
            onClose={() => router.back()}
            icon={<Clock size={20} color={colors.accent} />}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <ModalInput
                label="Titre"
                placeholder="Ex: Réunion projet..."
                value={title}
                onChangeText={setTitle}
              />

              <ModalSection label="Horaire">
                <TouchableOpacity
                  style={[styles.selector, { backgroundColor: colors.elevated, borderColor: colors.border }]}
                  onPress={() => setTimePickerVisibility(true)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.selectorIcon, { backgroundColor: colors.accentSoft }]}>
                    <Clock size={18} color={colors.accent} />
                  </View>
                  <Text style={[styles.selectorText, { color: colors.text, fontFamily: fonts.bold }]}>
                    {moment(date).format("HH:mm")}
                  </Text>
                </TouchableOpacity>
              </ModalSection>

              <ModalSection label="Priorité">
                <View style={[styles.segmented, { backgroundColor: colors.elevated }]}>
                  {PRIORITIES.map((p) => {
                    const active = selectedPriority.value === p.value;
                    return (
                      <TouchableOpacity
                        key={p.value}
                        onPress={() => setSelectedPriority(p)}
                        activeOpacity={0.7}
                        style={[
                          styles.segment,
                          active && {
                            backgroundColor: colors.surface,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                          },
                        ]}
                      >
                        <Flag size={13} color={active ? p.color : colors.textMuted} />
                        <Text
                          style={[
                            styles.segmentText,
                            {
                              color: active ? p.color : colors.textMuted,
                              fontFamily: active ? fonts.bold : fonts.regular,
                            },
                          ]}
                        >
                          {p.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>

              <ModalSection label="Thème">
                <View style={styles.grid}>
                  {themes.map((theme) => {
                    const active = selectedTheme?.id === theme.id;
                    return (
                      <TouchableOpacity
                        key={theme.id}
                        onPress={() => setSelectedTheme(theme)}
                        style={[
                          styles.themeCard,
                          {
                            backgroundColor: theme.color + (active ? "30" : "18"),
                            borderColor: active ? theme.color : "transparent",
                          },
                        ]}
                      >
                        <Text style={styles.themeEmoji}>{theme.emoji}</Text>
                        <Text
                          style={[
                            styles.themeLabel,
                            {
                              color: active ? theme.color : colors.text,
                              fontFamily: fonts.semiBold,
                            },
                          ]}
                        >
                          {theme.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>

              <ModalSection label="Récurrence">
                <View style={[styles.segmented, { backgroundColor: colors.elevated }]}>
                  {RECURRENCE_OPTIONS.map((r) => {
                    const active = selectedRecurrence.value === r.value;
                    return (
                      <TouchableOpacity
                        key={r.label}
                        onPress={() => setSelectedRecurrence(r)}
                        activeOpacity={0.7}
                        style={[
                          styles.segment,
                          active && {
                            backgroundColor: colors.surface,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.segmentText,
                            {
                              color: active ? colors.accent : colors.textMuted,
                              fontFamily: active ? fonts.bold : fonts.regular,
                            },
                          ]}
                        >
                          {r.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>
            </ScrollView>

            <ModalFooter label="Ajouter la tâche" onPress={() => {
              if (!title.trim() || !selectedTheme) return;
              useTaskStore.getState().addTask({
                title: title.trim(),
                time: moment(date).format("HH:mm"),
                duration: "1h",
                status: "pending",
                category: selectedTheme.label,
                color: selectedTheme.color,
                priority: selectedPriority.value as "low" | "medium" | "high",
                ...(selectedRecurrence.value && {
                  recurrence: {
                    frequency: selectedRecurrence.value,
                    interval: 1,
                  },
                  streak: 0,
                }),
              });
              router.back();
            }} />
          </KeyboardAvoidingView>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(d) => { setDate(d); setTimePickerVisibility(false); }}
        onCancel={() => setTimePickerVisibility(false)}
        locale="fr_FR"
        confirmTextIOS="Confirmer"
        cancelTextIOS="Annuler"
        is24Hour
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
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
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
  },
  selectorIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectorText: {
    fontSize: 18,
  },
  segmented: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 5,
  },
  segmentText: {
    fontSize: 13,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  themeCard: {
    width: "47%",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    gap: 6,
  },
  themeEmoji: {
    fontSize: 22,
  },
  themeLabel: {
    fontSize: 13,
  },
});

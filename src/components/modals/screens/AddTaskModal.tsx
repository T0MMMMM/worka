import {
  ChoicePicker,
  ChoiceOption,
  ModalFAB,
  ModalHeader,
  ModalInput,
  ModalSheet,
  PickerRow,
  SelectableTheme,
  ThemeSelector,
} from "@/src/components/modals";
import { Clock } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
import { RecurrenceRule } from "@/src/types/task";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PRIORITY_OPTIONS: ChoiceOption<string>[] = [
  { label: "Low",    value: "low",    activeColor: "#22C55E" },
  { label: "Medium", value: "medium", activeColor: "#F59E0B" },
  { label: "High",   value: "high",   activeColor: "#EF4444" },
];

const RECURRENCE_OPTIONS: ChoiceOption<string | null>[] = [
  { label: "Aucune",    value: null },
  { label: "Quotidien", value: "daily" },
  { label: "Hebdo",     value: "weekly" },
  { label: "Mensuel",   value: "monthly" },
];

export function AddTaskModal() {
  const router = useRouter();
  const { date: dateParam } = useLocalSearchParams<{ date?: string }>();
  const { colors } = useTheme();
  const rawThemes = useTaskStore((s) => s.themes);

  const themes: SelectableTheme[] = rawThemes.map((t) => ({
    id: t.id,
    label: t.label,
    emoji: t.emoji,
    color: t.color,
  }));

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<SelectableTheme>(themes[1] ?? themes[0]);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY_OPTIONS[1]);
  const [selectedRecurrence, setSelectedRecurrence] = useState(RECURRENCE_OPTIONS[0]);

  return (
    <ModalSheet>
      <View style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ModalHeader title="Nouvelle tâche" />

            <ModalInput
              label="Titre"
              placeholder="Ex: Réunion projet..."
              value={title}
              onChangeText={setTitle}
            />

            <PickerRow
              label="Horaire"
              value={moment(date).format("HH:mm")}
              icon={<Clock size={18} color={colors.accent} />}
              onPress={() => setTimePickerVisibility(true)}
            />

            <ChoicePicker
              label="Priorité"
              options={PRIORITY_OPTIONS}
              selected={selectedPriority.value}
              onSelect={setSelectedPriority}
            />

            <ChoicePicker
              label="Récurrence"
              options={RECURRENCE_OPTIONS}
              selected={selectedRecurrence.value}
              onSelect={setSelectedRecurrence}
            />

            <ThemeSelector
              label="Thème"
              themes={themes}
              selectedId={selectedTheme?.id}
              onSelect={setSelectedTheme}
            />

          </ScrollView>
        </KeyboardAvoidingView>

        <ModalFAB
          onPress={() => {
            if (!title.trim() || !selectedTheme) return;
            useTaskStore.getState().addTask({
              title: title.trim(),
              time: moment(date).format("HH:mm"),
              date: dateParam ?? moment().format("YYYY-MM-DD"),
              duration: "1h",
              status: "pending",
              category: selectedTheme.label,
              color: selectedTheme.color,
              priority: selectedPriority.value as "low" | "medium" | "high",
              ...(selectedRecurrence.value && {
                recurrence: {
                  frequency: selectedRecurrence.value as RecurrenceRule["frequency"],
                  interval: 1,
                },
                streak: 0,
              }),
            });
            router.back();
          }}
        />
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
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
  },
  scroll: {
    paddingBottom: 110,
  },
});

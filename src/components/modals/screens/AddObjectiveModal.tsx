import {
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
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function AddObjectiveModal() {
  const router = useRouter();
  const { colors } = useTheme();
  const rawThemes = useTaskStore((s) => s.themes);

  const themes: SelectableTheme[] = rawThemes.map((t) => ({
    id: t.id,
    label: t.label,
    emoji: t.emoji,
    color: t.color,
  }));

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(moment().add(30, "days").toDate());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<SelectableTheme>(themes[0]);

  return (
    <ModalSheet>
      <View style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <ModalHeader title="Nouvel objectif" />

            <ModalInput
              label="Titre"
              placeholder="Ex: Apprendre une langue..."
              value={title}
              onChangeText={setTitle}
            />

            <PickerRow
              label="Date d'échéance"
              value={moment(deadline).locale("fr").format("DD MMMM YYYY")}
              icon={<Clock size={18} color={colors.accent} />}
              onPress={() => setDatePickerVisibility(true)}
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
            const daysLeft = moment(deadline).diff(moment(), "days");
            useObjectiveStore.getState().addObjective({
              title: title.trim(),
              progress: 0,
              color: selectedTheme.color + "22",
              accent: selectedTheme.color,
              daysLeft: Math.max(0, daysLeft),
              completed: false,
              image: selectedTheme.emoji,
            });
            router.back();
          }}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(d) => { setDeadline(d); setDatePickerVisibility(false); }}
        onCancel={() => setDatePickerVisibility(false)}
        locale="fr_FR"
        confirmTextIOS="Confirmer"
        cancelTextIOS="Annuler"
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

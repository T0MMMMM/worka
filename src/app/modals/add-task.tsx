import {
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalSection,
} from "@/src/components/modals";
import {
  Briefcase,
  Checklist,
  Clock,
  Dumbbell,
  Flag,
  Palette,
  User,
} from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useTaskStore } from "@/src/store/taskStore";
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

const CATEGORIES = [
  { label: "Travail", color: "#FF5722", icon: Briefcase },
  { label: "Design", color: "#2196F3", icon: Palette },
  { label: "Perso", color: "#22C55E", icon: User },
  { label: "Sport", color: "#9C27B0", icon: Dumbbell },
];

const PRIORITIES = [
  { label: "Low", color: "#22C55E", value: "low" },
  { label: "Medium", color: "#F59E0B", value: "medium" },
  { label: "High", color: "#EF4444", value: "high" },
];

const RECURRENCE_OPTIONS: { label: string; value: RecurrenceRule["frequency"] | null }[] = [
  { label: "Aucune", value: null },
  { label: "Quotidien", value: "daily" },
  { label: "Hebdo", value: "weekly" },
  { label: "Mensuel", value: "monthly" },
];

export default function AddTaskModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1]);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[1]);
  const [selectedRecurrence, setSelectedRecurrence] = useState(RECURRENCE_OPTIONS[0]);

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
          <ModalHeader
            title="Nouvelle tâche"
            onClose={() => router.back()}
            icon={<Checklist size={20} color={colors.accent} />}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
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
                  style={[styles.selector, { backgroundColor: colors.bg, borderColor: colors.border }]}
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
                <View style={styles.row}>
                  {PRIORITIES.map((p) => {
                    const active = selectedPriority.value === p.value;
                    return (
                      <TouchableOpacity
                        key={p.value}
                        onPress={() => setSelectedPriority(p)}
                        style={[
                          styles.pill,
                          { borderColor: colors.border },
                          active && { backgroundColor: p.color + "12", borderColor: p.color },
                        ]}
                      >
                        <Flag size={14} color={active ? p.color : colors.textMuted} />
                        <Text
                          style={[
                            styles.pillText,
                            { color: active ? p.color : colors.textSecondary, fontFamily: fonts.bold },
                          ]}
                        >
                          {p.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>

              <ModalSection label="Catégorie">
                <View style={styles.grid}>
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory.label === cat.label;
                    return (
                      <TouchableOpacity
                        key={cat.label}
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                          styles.catCard,
                          active
                            ? { backgroundColor: cat.color, borderColor: cat.color }
                            : { borderColor: colors.border },
                        ]}
                      >
                        <Icon size={18} color={active ? "#FFF" : cat.color} />
                        <Text
                          style={[
                            styles.catText,
                            { color: active ? "#FFF" : colors.text, fontFamily: fonts.bold },
                          ]}
                        >
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>

              <ModalSection label="Récurrence">
                <View style={styles.row}>
                  {RECURRENCE_OPTIONS.map((r) => {
                    const active = selectedRecurrence.value === r.value;
                    return (
                      <TouchableOpacity
                        key={r.label}
                        onPress={() => setSelectedRecurrence(r)}
                        style={[
                          styles.pill,
                          { borderColor: colors.border },
                          active && { backgroundColor: colors.accentSoft, borderColor: colors.accent },
                        ]}
                      >
                        <Text
                          style={[
                            styles.pillText,
                            { color: active ? colors.accent : colors.textSecondary, fontFamily: fonts.bold },
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
          </KeyboardAvoidingView>

          <ModalFooter label="Ajouter la tâche" onPress={() => {
            if (!title.trim()) return;
            useTaskStore.getState().addTask({
              title: title.trim(),
              time: moment(date).format("HH:mm"),
              duration: "1h",
              status: "pending",
              category: selectedCategory.label,
              color: selectedCategory.color,
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 6,
  },
  pillText: {
    fontSize: 13,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  catCard: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 10,
  },
  catText: {
    fontSize: 14,
  },
});

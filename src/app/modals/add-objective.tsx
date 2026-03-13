import {
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalSection,
} from "@/src/components/modals";
import { Clock, Target } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useRouter } from "expo-router";
import moment from "moment";
import "moment/locale/fr";
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

const OBJECTIVE_THEMES = [
  { id: "1", label: "Lavande", color: "#8A80C8", bg: "#C8C0E8", emoji: "🌿" },
  { id: "2", label: "Or",      color: "#B89A30", bg: "#E8D87A", emoji: "⭐" },
  { id: "3", label: "Corail",  color: "#C45040", bg: "#F0A898", emoji: "🌸" },
  { id: "4", label: "Sauge",   color: "#4A8A5A", bg: "#A8C8B0", emoji: "🏃" },
  { id: "5", label: "Pêche",   color: "#A06040", bg: "#E8D0C0", emoji: "🧘" },
  { id: "6", label: "Ciel",    color: "#3B82F6", bg: "#BFDBFE", emoji: "✈️" },
];

export default function AddObjectiveModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(moment().add(30, "days").toDate());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(OBJECTIVE_THEMES[0]);

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
            title="Nouvel objectif"
            onClose={() => router.back()}
            icon={<Target size={20} color={colors.accent} />}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <ModalInput
                label="Titre"
                placeholder="Ex: Apprendre une langue..."
                value={title}
                onChangeText={setTitle}
              />

              <ModalSection label="Date d'échéance">
                <TouchableOpacity
                  style={[styles.selector, { backgroundColor: colors.elevated, borderColor: colors.border }]}
                  onPress={() => setDatePickerVisibility(true)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.selectorIcon, { backgroundColor: colors.accentSoft }]}>
                    <Clock size={18} color={colors.accent} />
                  </View>
                  <Text style={[styles.selectorText, { color: colors.text, fontFamily: fonts.bold }]}>
                    {moment(deadline).format("DD MMMM YYYY")}
                  </Text>
                </TouchableOpacity>
              </ModalSection>

              <ModalSection label="Thème">
                <View style={styles.grid}>
                  {OBJECTIVE_THEMES.map((theme) => {
                    const active = selectedTheme.id === theme.id;
                    return (
                      <TouchableOpacity
                        key={theme.id}
                        onPress={() => setSelectedTheme(theme)}
                        style={[
                          styles.themeCard,
                          {
                            backgroundColor: theme.bg + (active ? "FF" : "88"),
                            borderColor: active ? theme.color : "transparent",
                          },
                        ]}
                      >
                        <Text style={styles.themeEmoji}>{theme.emoji}</Text>
                        <Text style={[styles.themeLabel, { color: theme.color, fontFamily: fonts.semiBold }]}>
                          {theme.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>
            </ScrollView>

            <ModalFooter
              label="Créer l'objectif"
              onPress={() => {
                if (!title.trim()) return;
                const daysLeft = moment(deadline).diff(moment(), "days");
                useObjectiveStore.getState().addObjective({
                  title: title.trim(),
                  progress: 0,
                  color: selectedTheme.bg,
                  accent: selectedTheme.color,
                  daysLeft: Math.max(0, daysLeft),
                  completed: false,
                  image: selectedTheme.emoji,
                });
                router.back();
              }}
            />
          </KeyboardAvoidingView>
        </View>
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
    fontSize: 24,
  },
  themeLabel: {
    fontSize: 13,
  },
});

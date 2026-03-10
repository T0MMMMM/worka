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

const COLORS = [
  { label: "Bleu", color: "#2196F3" },
  { label: "Violet", color: "#7B61FF" },
  { label: "Rouge", color: "#EF4444" },
  { label: "Vert", color: "#22C55E" },
  { label: "Orange", color: "#F59E0B" },
];

export default function AddObjectiveModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(moment().add(30, "days").toDate());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

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
            title="Nouvel objectif"
            onClose={() => router.back()}
            icon={<Target size={20} color={colors.accent} />}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
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
                  style={[styles.selector, { backgroundColor: colors.bg, borderColor: colors.border }]}
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

              <ModalSection label="Couleur">
                <View style={styles.colorsGrid}>
                  {COLORS.map((c) => {
                    const active = selectedColor.label === c.label;
                    return (
                      <TouchableOpacity
                        key={c.label}
                        onPress={() => setSelectedColor(c)}
                        style={[
                          styles.colorPill,
                          active
                            ? { backgroundColor: c.color + "12", borderColor: c.color }
                            : { borderColor: colors.border },
                        ]}
                      >
                        <View style={[styles.colorDot, { backgroundColor: c.color }]} />
                        <Text
                          style={[
                            styles.colorLabel,
                            { color: active ? c.color : colors.text, fontFamily: fonts.bold },
                          ]}
                        >
                          {c.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>
            </ScrollView>
          </KeyboardAvoidingView>

          <ModalFooter label="Créer l'objectif" onPress={() => {
            if (!title.trim()) return;
            const daysLeft = moment(deadline).diff(moment(), "days");
            useObjectiveStore.getState().addObjective({
              title: title.trim(),
              progress: 0,
              color: selectedColor.color,
              accent: selectedColor.color,
              daysLeft: Math.max(0, daysLeft),
              completed: false,
            });
            router.back();
          }} />
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
  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorPill: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 10,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  colorLabel: {
    fontSize: 14,
  },
});

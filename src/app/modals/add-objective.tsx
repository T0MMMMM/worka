import { ModalFooter, ModalHeader, ModalInput, ModalSection } from "@/src/components/modals
import { Clock, Target } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
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
  { label: "Bleu", color: "#007AFF" },
  { label: "Violet", color: "#AF52DE" },
  { label: "Rouge", color: "#FF3B30" },
  { label: "Vert", color: "#34C759" },
  { label: "Orange", color: "#FF9500" },
];

export default function AddObjectiveModal() {
  const router = useRouter();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(moment().add(30, "days").toDate());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAdd = () => {
    router.back();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setDeadline(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      <View style={[styles.modalContent, { maxHeight: SCREEN_HEIGHT * 0.95 }]}>
        <View style={styles.modalHandle} />

        <View style={styles.contentContainer}>
          <ModalHeader
            title="Nouvel objectif"
            onClose={() => router.back()}
            icon={<Target size={24} color={theme.colors.text} />}
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
                  style={styles.dateSelector}
                  onPress={showDatePicker}
                  activeOpacity={0.7}
                >
                  <Clock size={20} color={theme.colors.systemBlue} />
                  <Text style={styles.dateText}>
                    {moment(deadline).format("DD MMMM YYYY")}
                  </Text>
                </TouchableOpacity>
              </ModalSection>

              <ModalSection label="Couleur">
                <View style={styles.colorsGrid}>
                  {COLORS.map((c) => {
                    const isSelected = selectedColor.label === c.label;
                    return (
                      <TouchableOpacity
                        key={c.label}
                        onPress={() => setSelectedColor(c)}
                        style={[
                          styles.colorPill,
                          isSelected && {
                            backgroundColor: c.color + "20",
                            borderColor: c.color
                          },
                          !isSelected && {
                            borderColor: theme.colors.separator
                          }
                        ]}
                      >
                        <View
                          style={[
                            styles.colorDot,
                            { backgroundColor: c.color },
                          ]}
                        />
                        <Text
                          style={[
                            styles.colorLabel,
                            isSelected ? { color: c.color } : { color: theme.colors.text }
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

          <ModalFooter label="Créer l'objectif" onPress={handleAdd} />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    flex: 1,
    paddingBottom: 0,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  dateText: {
    fontSize: 17,
    fontFamily: theme.fonts.urbanistSemiBold,
    color: theme.colors.text,
  },
  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorPill: {
    width: '48%',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    backgroundColor: theme.colors.background,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  colorLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.urbanistSemiBold,
  },
});

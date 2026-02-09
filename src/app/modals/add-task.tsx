import { ModalFooter, ModalHeader, ModalInput, ModalSection } from "@/src/components/modals";
import {
  Briefcase,
  Checklist,
  Clock,
  Dumbbell,
  Flag,
  Palette,
  User,
} from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
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
  { label: "Perso", color: "#4CAF50", icon: User },
  { label: "Sport", color: "#9C27B0", icon: Dumbbell },
];

const PRIORITIES = [
  { label: "Low", color: "#4CAF50", value: "low" },
  { label: "Medium", color: "#FFB142", value: "medium" },
  { label: "High", color: "#FF5252", value: "high" },
];

export default function AddTaskModal() {
  const router = useRouter();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1]);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[1]);

  const handleAdd = () => {
    router.back();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedDate: Date) => {
    setDate(selectedDate);
    hideTimePicker();
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
            title="Nouvelle tâche"
            onClose={() => router.back()}
            icon={<Checklist size={24} color={theme.colors.text} />}
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
                  style={styles.dateSelector}
                  onPress={showTimePicker}
                  activeOpacity={0.7}
                >
                  <Clock size={20} color={theme.colors.systemBlue} />
                  <Text style={styles.dateText}>
                    {moment(date).format("HH:mm")}
                  </Text>
                </TouchableOpacity>
              </ModalSection>

              <ModalSection label="Priorité">
                <View style={styles.row}>
                  {PRIORITIES.map((p) => {
                    const isSelected = selectedPriority.value === p.value;
                    return (
                      <TouchableOpacity
                        key={p.value}
                        onPress={() => setSelectedPriority(p)}
                        style={[
                          styles.pill,
                          isSelected && { backgroundColor: p.color + "20", borderColor: p.color },
                          !isSelected && { borderColor: theme.colors.separator },
                        ]}
                      >
                        <Flag
                          size={16}
                          color={isSelected ? p.color : theme.colors.textSecondary}
                        />
                        <Text
                          style={[
                            styles.pillText,
                            { color: isSelected ? p.color : theme.colors.textSecondary },
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
                    const IconComponent = cat.icon;
                    const isSelected = selectedCategory.label === cat.label;
                    return (
                      <TouchableOpacity
                        key={cat.label}
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                          styles.categoryCard,
                          isSelected && {
                            backgroundColor: cat.color,
                            borderColor: cat.color,
                          },
                          !isSelected && {
                            borderColor: theme.colors.separator,
                          }
                        ]}
                      >
                        <IconComponent
                          size={20}
                          color={isSelected ? "#FFF" : cat.color}
                        />
                        <Text
                          style={[
                            styles.categoryText,
                            isSelected ? { color: "#FFF" } : { color: theme.colors.text },
                          ]}
                        >
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ModalSection>

            </ScrollView>
          </KeyboardAvoidingView>

          <ModalFooter label="Ajouter la tâche" onPress={handleAdd} />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    backgroundColor: theme.colors.background,
  },
  pillText: {
    fontSize: 14,
    fontFamily: theme.fonts.urbanistSemiBold,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    backgroundColor: theme.colors.background,
  },
  categoryText: {
    fontSize: 15,
    fontFamily: theme.fonts.urbanistBold,
  },
});

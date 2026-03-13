import { ModalHeader } from "@/src/components/modals";
import { Palette, X } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { TaskTheme, useTaskThemeStore } from "@/src/store/taskThemeStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const EMOJI_OPTIONS = ["💼", "🎨", "🙂", "🏃", "📚", "🎯", "🌿", "💡", "🧘", "🎵", "✈️", "🏋️"];
const COLOR_OPTIONS = [
  "#FF5722", "#2196F3", "#22C55E", "#9C27B0",
  "#F59E0B", "#EF4444", "#10B981", "#3B82F6",
];

export default function TaskThemesModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const themes = useTaskThemeStore((s) => s.themes);
  const addTheme = useTaskThemeStore((s) => s.addTheme);
  const deleteTheme = useTaskThemeStore((s) => s.deleteTheme);

  const [newLabel, setNewLabel] = useState("");
  const [newEmoji, setNewEmoji] = useState(EMOJI_OPTIONS[0]);
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    addTheme({ label: newLabel.trim(), color: newColor, emoji: newEmoji });
    setNewLabel("");
    setNewEmoji(EMOJI_OPTIONS[0]);
    setNewColor(COLOR_OPTIONS[0]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      <View style={[styles.modal, { maxHeight: SCREEN_HEIGHT * 0.85, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border }]}>
        <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerWrapper}>
              <ModalHeader
                title="Thèmes"
                onClose={() => router.back()}
                icon={<Palette size={20} color={colors.accent} />}
              />
            </View>

            {/* Existing themes */}
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                VOS THÈMES
              </Text>
              <View style={[styles.themeList, { backgroundColor: colors.elevated }]}>
                {themes.map((theme, index) => (
                  <View
                    key={theme.id}
                    style={[
                      styles.themeRow,
                      index < themes.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                    ]}
                  >
                    <View style={[styles.themeIconCircle, { backgroundColor: theme.color + "20" }]}>
                      <Text style={styles.themeEmoji}>{theme.emoji}</Text>
                    </View>
                    <Text style={[styles.themeRowLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                      {theme.label}
                    </Text>
                    <View style={[styles.colorDot, { backgroundColor: theme.color }]} />
                    {themes.length > 1 && (
                      <TouchableOpacity
                        onPress={() => deleteTheme(theme.id)}
                        style={[styles.deleteBtn, { backgroundColor: colors.surface }]}
                        activeOpacity={0.7}
                      >
                        <X size={14} color={colors.danger} />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Add new theme */}
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                AJOUTER UN THÈME
              </Text>

              {/* Emoji picker */}
              <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                ICÔNE
              </Text>
              <View style={styles.emojiRow}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => setNewEmoji(emoji)}
                    style={[
                      styles.emojiBtn,
                      { backgroundColor: newEmoji === emoji ? colors.accentSoft : colors.elevated },
                      newEmoji === emoji && { borderWidth: 1.5, borderColor: colors.accent },
                    ]}
                  >
                    <Text style={styles.emojiBtnText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Color picker */}
              <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                COULEUR
              </Text>
              <View style={styles.colorRow}>
                {COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setNewColor(color)}
                    style={[
                      styles.colorChip,
                      { backgroundColor: color },
                      newColor === color && styles.colorChipActive,
                    ]}
                  />
                ))}
              </View>

              {/* Label input */}
              <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
                NOM
              </Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.elevated, color: colors.text, borderColor: colors.border, fontFamily: fonts.regular }]}
                placeholder="Ex: Santé, Famille..."
                placeholderTextColor={colors.textMuted}
                value={newLabel}
                onChangeText={setNewLabel}
              />

              {/* Add button */}
              <TouchableOpacity
                onPress={handleAdd}
                activeOpacity={newLabel.trim() ? 0.8 : 1}
                style={[
                  styles.addButton,
                  {
                    backgroundColor: newLabel.trim() ? colors.accent : colors.elevated,
                    shadowColor: newLabel.trim() ? colors.accent : "transparent",
                  },
                ]}
              >
                <Text style={[styles.addButtonText, { fontFamily: fonts.bold, color: newLabel.trim() ? "#FFF" : colors.textMuted }]}>
                  Ajouter le thème
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
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
  scrollContent: {
    paddingBottom: 40,
  },
  headerWrapper: {
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 12,
  },
  themeList: {
    borderRadius: 20,
    overflow: "hidden",
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  themeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeEmoji: {
    fontSize: 18,
  },
  themeRowLabel: {
    flex: 1,
    fontSize: 15,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 16,
  },
  emojiRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  emojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  emojiBtnText: {
    fontSize: 20,
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  colorChipActive: {
    borderWidth: 3,
    borderColor: "#FFF",
  },
  input: {
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
  },
  addButton: {
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 17,
  },
});

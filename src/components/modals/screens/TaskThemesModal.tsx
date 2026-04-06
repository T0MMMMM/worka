import { ModalFAB, ModalHeader, ModalSheet } from "@/src/components/modals";
import { X } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { useTaskStore } from "@/src/store/taskStore";
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
} from "react-native";

const EMOJI_OPTIONS = ["💼", "🎨", "🙂", "🏃", "📚", "🎯", "🌿", "💡", "🧘", "🎵", "✈️", "🏋️"];
const COLOR_OPTIONS = [
  "#7B6FCC", "#C87060", "#5A8A6A", "#C0A020",
  "#4B8FE0", "#9060A0", "#3A9080", "#A08060",
];

export function TaskThemesModal() {
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const isDark = mode === "dark";
  const themes = useTaskStore((s) => s.themes);
  const addTheme = useTaskStore((s) => s.addTheme);
  const deleteTheme = useTaskStore((s) => s.deleteTheme);

  const [newLabel, setNewLabel] = useState("");
  const [newEmoji, setNewEmoji] = useState(EMOJI_OPTIONS[0]);
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);

  const glassField: object = {
    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.45)",
  };

  return (
    <ModalSheet maxHeightRatio={0.88}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerPad}>
            <ModalHeader title="Thèmes" />
          </View>

          {/* Existing themes */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
              VOS THÈMES
            </Text>
            <View style={[styles.themeList, glassField, { borderWidth: 1 }]}>
              {themes.map((theme, index) => (
                <View
                  key={theme.id}
                  style={[
                    styles.themeRow,
                    index < themes.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                    },
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
                      style={styles.deleteBtn}
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

            <Text style={[styles.fieldLabel, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
              NOM
            </Text>
            <TextInput
              style={[
                styles.input,
                glassField,
                { color: colors.text, fontFamily: fonts.regular, borderWidth: 1 },
              ]}
              placeholder="Ex: Santé, Famille..."
              placeholderTextColor={colors.textMuted}
              value={newLabel}
              onChangeText={setNewLabel}
              textAlign="center"
            />

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
                    {
                      backgroundColor: newEmoji === emoji
                        ? colors.accentSoft
                        : isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
                      borderColor: newEmoji === emoji
                        ? colors.accent
                        : isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.45)",
                    },
                  ]}
                >
                  <Text style={styles.emojiBtnText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

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

          </View>

          <View style={{ height: 110 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalFAB onPress={() => {
        if (!newLabel.trim()) return;
        addTheme({ label: newLabel.trim(), color: newColor, emoji: newEmoji });
        setNewLabel("");
        setNewEmoji(EMOJI_OPTIONS[0]);
        setNewColor(COLOR_OPTIONS[0]);
      }} />
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  headerPad: {
    paddingHorizontal: 28,
    paddingTop: 10,
  },
  section: {
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: "center",
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
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 16,
    textAlign: "center",
  },
  emojiRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  emojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  emojiBtnText: {
    fontSize: 20,
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
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
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});

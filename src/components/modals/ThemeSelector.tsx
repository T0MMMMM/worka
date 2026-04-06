import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface SelectableTheme {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg?: string;
}

interface ThemeSelectorProps {
  themes: SelectableTheme[];
  selectedId: string | undefined;
  onSelect: (theme: SelectableTheme) => void;
  label?: string;
}

export function ThemeSelector({ themes, selectedId, onSelect, label }: ThemeSelectorProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fonts.bold }]}>
          {label}
        </Text>
      )}
    <View style={styles.grid}>
      {themes.map((theme) => {
        const active = selectedId === theme.id;
        const cardBg = theme.bg
          ? theme.bg + (active ? "FF" : "88")
          : theme.color + (active ? "30" : "18");

        return (
          <TouchableOpacity
            key={theme.id}
            onPress={() => onSelect(theme)}
            style={[
              styles.card,
              {
                backgroundColor: cardBg,
                borderColor: active ? theme.color : "transparent",
              },
            ]}
          >
            <Text style={styles.emoji}>{theme.emoji}</Text>
            <Text
              style={[
                styles.title,
                {
                  color: active || theme.bg ? theme.color : colors.text,
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  card: {
    width: "47%",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    gap: 6,
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 13,
    textAlign: "center",
  },
});

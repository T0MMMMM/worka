import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { THEME_PRESETS } from "@/src/constants/themePresets";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function ThemePickerModal() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const customAccent = useThemeStore((s) => s.customAccent);
  const setAccent = useThemeStore((s) => s.setAccent);
  const setPreset = useThemeStore((s) => s.setPreset);

  const currentAccent = customAccent ?? "#7B61FF";

  const handleSelect = (preset: (typeof THEME_PRESETS)[0]) => {
    if (preset.name === "purple") {
      setAccent(null);
      setPreset(null);
    } else {
      setAccent(preset.accent);
      setPreset(preset.name);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      <View style={[styles.modal, { maxHeight: SCREEN_HEIGHT * 0.6, backgroundColor: colors.surface }]}>
        <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
            Thème de couleur
          </Text>

          <View style={styles.grid}>
            {THEME_PRESETS.map((preset) => {
              const active = preset.accent === currentAccent;
              return (
                <TouchableOpacity
                  key={preset.name}
                  onPress={() => handleSelect(preset)}
                  style={[
                    styles.swatch,
                    { borderColor: active ? preset.accent : colors.border },
                    active && { backgroundColor: preset.accent + "12" },
                  ]}
                >
                  <View style={[styles.dot, { backgroundColor: preset.accent }]} />
                  <Text
                    style={[
                      styles.label,
                      {
                        color: active ? preset.accent : colors.text,
                        fontFamily: fonts.bold,
                      },
                    ]}
                  >
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  swatch: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  label: {
    fontSize: 14,
  },
});

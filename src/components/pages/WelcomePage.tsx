import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

const SLIDES = [
  {
    id: "welcome",
    title: "Bienvenue\nsur ",
    bold: "Worka",
    sub: "Planifiez votre journée,\naccomplissez vos objectifs.",
  },
  {
    id: "planning",
    title: "Organisez\nvotre ",
    bold: "journée",
    sub: "Créez des tâches, définissez des horaires et suivez chaque action au quotidien.",
  },
  {
    id: "objectives",
    title: "Atteignez\nvos ",
    bold: "objectifs",
    sub: "Visualisez votre avancement et restez motivé grâce à un suivi précis.",
  },
];

const MOCK_TASKS = [
  { color: "#7B6FCC", label: "Réunion projet",  time: "10:00", emoji: "🌿", priority: "high",   priorityColor: "#EF4444", category: "Lavande" },
  { color: "#C87060", label: "Session Design",  time: "14:30", emoji: "🌸", priority: "medium", priorityColor: "#F59E0B", category: "Pêche"   },
  { color: "#5A8A6A", label: "Entraînement",    time: "18:00", emoji: "🏃", priority: "low",    priorityColor: "#22C55E", category: "Sauge"   },
];

const MOCK_OBJECTIVES = [
  { bg: "#D4CFEE", accent: "#7B6FCC", label: "Développement perso", pct: 75, emoji: "🌿" },
  { bg: "#C8DDCC", accent: "#5A8A6A", label: "Marathon de Paris",   pct: 90, emoji: "🏃" },
];

export default function WelcomePage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const [activeIdx, setActiveIdx] = useState(0);
  const listRef = useRef<FlatList>(null);

  const gradientColors: [string, string, string] =
    mode === "dark"
      ? ["#1A1510", "#221C14", "#1A1510"]
      : ["#eeebf9ff", "#f5f4f9", "#e6e3f1ff"];

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) setActiveIdx(viewableItems[0].index ?? 0);
  });

  return (
    <LinearGradient colors={gradientColors} locations={[0, 0.5, 1]} style={styles.container}>
      {/* Ambient glows */}
      <View style={[styles.glow1, { backgroundColor: colors.accent + "18" }]} />
      <View style={[styles.glow2, { backgroundColor: colors.accent + "0C" }]} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <FlatList
          ref={listRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(s) => s.id}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          style={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <View style={styles.slide}>

              <Text style={[styles.title, { color: colors.text }]}>
                <Text style={{ fontFamily: fonts.light }}>{item.title}</Text>
                <Text style={{ fontFamily: fonts.extraBold }}>{item.bold}</Text>
              </Text>

              <Text style={[styles.sub, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                {item.sub}
              </Text>

              {/* Mock task cards */}
              {index === 1 && (
                <View style={styles.visual}>
                  {MOCK_TASKS.map((t, i) => (
                    <View key={i} style={[styles.taskCard, { backgroundColor: colors.surface }]}>
                      {/* Color overlay */}
                      <View style={[StyleSheet.absoluteFill, { backgroundColor: t.color + "28", borderRadius: 14 }]} />
                      <View style={styles.taskInner}>
                        <View style={styles.taskBody}>
                          <View style={styles.taskTitleRow}>
                            <Text style={styles.taskEmoji}>{t.emoji}</Text>
                            <Text style={[styles.taskLabel, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>{t.label}</Text>
                          </View>
                          <View style={styles.taskMeta}>
                            <View style={[styles.metaDot, { backgroundColor: t.color }]} />
                            <Text style={[styles.metaText, { color: t.color, fontFamily: fonts.semiBold }]}>{t.category}</Text>
                            <View style={[styles.metaDot, { backgroundColor: t.priorityColor }]} />
                            <Text style={[styles.metaText, { color: t.priorityColor, fontFamily: fonts.regular }]}>{t.priority}</Text>
                            <Text style={[styles.metaText, { color: colors.textMuted, fontFamily: fonts.regular }]}>· {t.time}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Mock objective cards */}
              {index === 2 && (
                <View style={[styles.visual, { flexDirection: "row", gap: 8 }]}>
                  {MOCK_OBJECTIVES.map((o, i) => (
                    <View key={i} style={[styles.objCard, { backgroundColor: o.bg }]}>
                      <Text style={[styles.objTitle, { fontFamily: fonts.bold }]} numberOfLines={2}>{o.label}</Text>
                      <Text style={styles.objEmoji}>{o.emoji}</Text>
                      <View style={styles.objBottom}>
                        <Text style={[styles.objPct, { color: "#1C1C1E", fontFamily: fonts.extraBold }]}>{o.pct}%</Text>
                        <View style={[styles.objBubble, { backgroundColor: o.accent + "28" }]}>
                          <View style={[styles.objFill, { height: `${o.pct}%` as any, backgroundColor: o.accent + "88" }]} />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />

        {/* Bottom */}
        <View style={styles.bottom}>
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => listRef.current?.scrollToIndex({ index: i, animated: true })}
                style={[
                  styles.dot,
                  { backgroundColor: i === activeIdx ? colors.accent : colors.border },
                  i === activeIdx && styles.dotActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={[styles.primaryBtnText, { color: colors.bg, fontFamily: fonts.bold }]}>
              Commencer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(auth)/login")}>
            <Text style={[styles.linkText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              Déjà un compte ?{" "}
              <Text style={{ color: colors.accent, fontFamily: fonts.semiBold }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow1: { position: "absolute", width: 340, height: 340, borderRadius: 170, top: -100, right: -100 },
  glow2: { position: "absolute", width: 260, height: 260, borderRadius: 130, bottom: 120, left: -80 },
  slide: { width: W, paddingHorizontal: 28, paddingTop: 40 },
  title: { fontSize: 52, lineHeight: 60, letterSpacing: -1.5, marginBottom: 14 },
  sub: { fontSize: 16, lineHeight: 24, marginBottom: 28 },
  visual: { gap: 8 },
  // Task mock
  taskCard: { borderRadius: 14, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.14, shadowRadius: 10, elevation: 3 },
  taskInner: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12 },
  taskBody: { flex: 1, gap: 5 },
  taskTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  taskEmoji: { fontSize: 15, lineHeight: 18 },
  taskLabel: { flex: 1, fontSize: 14, lineHeight: 18 },
  taskMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaDot: { width: 5, height: 5, borderRadius: 2.5 },
  metaText: { fontSize: 11 },
  // Objective mock
  objCard: { flex: 1, borderRadius: 24, padding: 14, minHeight: 140, overflow: "hidden", justifyContent: "space-between" },
  objTitle: { fontSize: 13, lineHeight: 18, color: "#1C1C1E", maxWidth: "80%" },
  objEmoji: { position: "absolute", bottom: 40, right: 8, fontSize: 36, lineHeight: 44, opacity: 0.85 },
  objBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  objPct: { fontSize: 14 },
  objBubble: { width: 36, height: 36, borderRadius: 18, overflow: "hidden", justifyContent: "flex-end" },
  objFill: { width: "100%", borderRadius: 18 },
  // Bottom section
  bottom: { paddingHorizontal: 24, paddingBottom: 36, gap: 14, alignItems: "center" },
  dots: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { height: 6, width: 6, borderRadius: 3 },
  dotActive: { width: 20 },
  primaryBtn: {
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
    width: "100%",
  },
  primaryBtnText: { fontSize: 17 },
  linkText: { fontSize: 15 },
});

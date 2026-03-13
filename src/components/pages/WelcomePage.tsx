import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomePage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Ambient glows */}
      <View style={[styles.glow1, { backgroundColor: colors.accent + "14" }]} />
      <View style={[styles.glow2, { backgroundColor: colors.accent + "09" }]} />
      <View style={[styles.glow3, { backgroundColor: colors.accent + "07" }]} />

      {/* Hero content */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={[styles.content, { paddingTop: insets.top + 70 }]}
      >
        <View style={[styles.badge, { backgroundColor: colors.elevated, borderColor: colors.border }]}>
          <Text style={[styles.badgeText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
            ✦ Productivité simplifiée
          </Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          <Text style={{ fontFamily: fonts.light }}>Bienvenue{"\n"}sur </Text>
          <Text style={{ fontFamily: fonts.extraBold }}>Worka</Text>
        </Text>

        <Text style={[styles.tagline, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Planifiez votre journée,{"\n"}accomplissez vos objectifs.
        </Text>

        {/* Feature pills */}
        <View style={styles.pills}>
          {["📅 Planning", "🎯 Objectifs", "📊 Rapport"].map((label) => (
            <View key={label} style={[styles.pill, { backgroundColor: colors.elevated, borderColor: colors.border }]}>
              <Text style={[styles.pillText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                {label}
              </Text>
            </View>
          ))}
        </View>
      </MotiView>

      {/* CTA */}
      <MotiView
        from={{ opacity: 0, translateY: 24 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 420, delay: 280 }}
        style={[styles.footer, { paddingBottom: insets.bottom + 44 }]}
      >
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: colors.accent, shadowColor: colors.accent },
          ]}
          activeOpacity={0.85}
          onPress={() => router.replace("/(tabs)/planning")}
        >
          <Text style={[styles.primaryBtnText, { color: colors.bg, fontFamily: fonts.bold }]}>
            Commencer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryBtn, { backgroundColor: colors.elevated, borderColor: colors.border }]}
          activeOpacity={0.7}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glow1: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    top: -100,
    right: -100,
  },
  glow2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    bottom: 80,
    left: -80,
  },
  glow3: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    top: "40%",
    left: "30%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 28,
  },
  badgeText: {
    fontSize: 13,
  },
  title: {
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -2,
    marginBottom: 18,
  },
  tagline: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 32,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryBtn: {
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryBtnText: {
    fontSize: 17,
  },
  secondaryBtn: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontSize: 15,
  },
});

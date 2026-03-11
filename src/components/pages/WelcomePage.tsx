import { theme } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
        style={[styles.content, { paddingTop: insets.top + 60 }]}
      >
        <Text style={styles.subtitle}>Bienvenue sur</Text>
        <Text style={styles.title}>Worka</Text>
        <Text style={styles.tagline}>
          Planifiez votre journée,{"\n"}accomplissez vos objectifs.
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400, delay: 300 }}
        style={[styles.footer, { paddingBottom: insets.bottom + 40 }]}
      >
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.replace("/(tabs)/planning")}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.linkText}>
            Déjà un compte ? <Text style={styles.linkAccent}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  glow1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(196,80,64,0.08)",
    top: -80,
    right: -80,
  },
  glow2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(138,128,200,0.08)",
    bottom: 100,
    left: -80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 72,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text,
    letterSpacing: -3,
  },
  tagline: {
    fontSize: 17,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 26,
    marginTop: 20,
  },
  footer: {
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "100%",
    height: 58,
    backgroundColor: theme.colors.accent,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#F2E8E1",
    fontSize: 17,
    fontFamily: theme.fonts.bold,
  },
  linkText: {
    fontSize: 15,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  linkAccent: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.semiBold,
  },
});

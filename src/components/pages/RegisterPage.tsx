import { AuthInput } from "@/src/components/auth/AuthInput";
import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterPage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Ambient glows */}
      <View style={[styles.glow1, { backgroundColor: colors.accent + "10" }]} />
      <View style={[styles.glow2, { backgroundColor: colors.accent + "08" }]} />

      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={[styles.inner, { paddingTop: insets.top + 50 }]}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={[styles.backBtn, { backgroundColor: colors.elevated, borderColor: colors.border }]}
        >
          <Text style={[styles.backArrow, { color: colors.textSecondary }]}>←</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            <Text style={{ fontFamily: fonts.light }}>Créer un </Text>
            <Text style={{ fontFamily: fonts.extraBold }}>compte.</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            Rejoignez Worka et commencez
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <AuthInput
            label="Nom complet"
            placeholder="Votre nom"
            value={name}
            onChangeText={setName}
          />
          <AuthInput
            label="Email"
            placeholder="votre@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInput
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.accent },
            ]}
            activeOpacity={0.8}
            onPress={() => router.replace("/(tabs)/planning")}
          >
            <Text style={[styles.buttonText, { color: colors.bg, fontFamily: fonts.bold }]}>
              Créer mon compte
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer link */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/(auth)/login")}>
            <Text style={[styles.linkText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              Déjà un compte ?{" "}
              <Text style={[styles.linkAccent, { color: colors.accent, fontFamily: fonts.semiBold }]}>
                Se connecter
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glow1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -60,
    left: -100,
  },
  glow2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: 120,
    right: -60,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  backArrow: {
    fontSize: 18,
  },
  header: {
    marginBottom: 36,
    gap: 6,
  },
  title: {
    fontSize: 38,
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  form: {
    gap: 18,
  },
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  linkText: {
    fontSize: 15,
  },
  linkAccent: {},
});

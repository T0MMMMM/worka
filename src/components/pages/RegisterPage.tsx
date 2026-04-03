import { AuthInput } from "@/src/components/auth/AuthInput";
import { useTheme } from "@/src/hooks/useTheme";
import { useThemeStore } from "@/src/store/themeStore";
import { signUp } from "@/src/services/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterPage() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gradientColors: [string, string, string] =
    mode === "dark"
      ? ["#1A1510", "#221C14", "#1A1510"]
      : ["#eeebf9ff", "#f5f4f9", "#e6e3f1ff"];

  async function handleSignUp() {
    setLoading(true);
    setError(null);
    const result = await signUp(email, password, name);
    if ("error" in result) {
      setError(result.error);
      setLoading(false);
    }
    // On success: onAuthStateChange in _layout.tsx handles navigation.
  }

  return (
    <LinearGradient colors={gradientColors} locations={[0, 0.5, 1]} style={styles.container}>
      <View style={[styles.glow, { backgroundColor: colors.accent + "14" }]} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <MotiView
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400 }}
              style={styles.inner}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={{ fontSize: 18, color: colors.textSecondary }}>←</Text>
              </TouchableOpacity>

              <Text style={[styles.wordmark, { color: colors.text, fontFamily: fonts.extraBold }]}>Worka</Text>

              <Text style={[styles.title, { color: colors.text }]}>
                <Text style={{ fontFamily: fonts.light }}>Créer un </Text>
                <Text style={{ fontFamily: fonts.extraBold }}>compte.</Text>
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Rejoignez Worka et commencez
              </Text>

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

                {error && (
                  <Text style={[styles.errorText, { color: "#E05555", fontFamily: fonts.regular }]}>
                    {error}
                  </Text>
                )}

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: colors.accent, shadowColor: colors.accent, opacity: loading ? 0.7 : 1 }]}
                  activeOpacity={0.85}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.bg} />
                  ) : (
                    <Text style={[styles.btnText, { color: colors.bg, fontFamily: fonts.bold }]}>
                      Créer mon compte
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/(auth)/login")}>
                  <Text style={[styles.link, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                    Déjà un compte ?{" "}
                    <Text style={{ color: colors.accent, fontFamily: fonts.semiBold }}>Se connecter</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </MotiView>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: "absolute", width: 300, height: 300, borderRadius: 150, top: -80, left: -100 },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  wordmark: { fontSize: 26, letterSpacing: -0.5, marginBottom: 36 },
  title: { fontSize: 38, lineHeight: 46, marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22, marginBottom: 40 },
  form: { gap: 18 },
  errorText: { fontSize: 14, lineHeight: 20, textAlign: "center" },
  btn: { height: 56, borderRadius: 16, alignItems: "center", justifyContent: "center", marginTop: 8, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  btnText: { fontSize: 17 },
  footer: { flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 20 },
  link: { fontSize: 15 },
});

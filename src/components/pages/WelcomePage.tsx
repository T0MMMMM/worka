import Model3D from "@/src/components/utils/Model3D";
import { theme } from "@/src/constants/theme";
import { OrbitControls } from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { Suspense } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const logoModel = {
    name: "Logo",
    link: require("@/src/public/models/logo-icon.glb"),
    scale: 2.2,
    rotation: [0, 0, -Math.PI / 24],
    position: [0, 5, 0],
    relativePosition: [0, -1, 0],
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.softCream, "#FFFFFF", theme.colors.softPink]}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 1000 }}
          style={styles.contentContainer}
        >
          {/* Header */}
          <View style={[styles.header, { marginTop: insets.top + 20 }]}>
            <Text style={styles.welcomeText}>Bienvenue sur</Text>
            <Text style={styles.appName}>Worka</Text>
          </View>

          {/* 3D Model Area */}
          <View style={styles.modelWrapper}>
            <Canvas>
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} />
              <Suspense fallback={null}>
                <Model3D model={logoModel} />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={2}
                autoRotate={true}
                autoRotateSpeed={3}
              />
            </Canvas>
          </View>

          {/* Footer content */}
          <View style={[styles.footer, { paddingBottom: insets.bottom + 40 }]}>
            <Text style={styles.tagline}>
              Planifiez votre journée, {"\n"}atteignez vos objectifs.
            </Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => router.replace("/planning")}
            >
              <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: theme.fonts.urbanist,
    color: theme.colors.textSecondary,
    marginBottom: -5,
  },
  appName: {
    fontSize: 64,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.text,
    letterSpacing: -2,
  },
  modelWrapper: {
    height: "45%",
    width: "100%",
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 30,
  },
  tagline: {
    fontSize: 18,
    fontFamily: theme.fonts.urbanistMedium,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: theme.colors.text,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: theme.fonts.urbanistBold,
  },
});
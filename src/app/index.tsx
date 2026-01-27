import { OrbitControls } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { useRouter } from 'expo-router';
import React, { Suspense } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Model3D from "../components/utils/Model3D";
import { theme } from "../constants/theme";
import useFonts from "../hooks/useFonts";

export default function Page() {

  const router = useRouter();

  const logoModel = {
    name: "Logo",
    link: require("@/src/public/models/logo-icon.glb"),
    scale: 1.8,
    rotation: [0, 0, -Math.PI / 24],
    position: [0, 10, 0],
    relativePosition: [0, -1, 0],
  }

  const fontsLoaded = useFonts();

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      <View style={styles.modelContainer}>
        <Canvas>
          <ambientLight intensity={2} />
          <pointLight position={[3, 0, 1]} intensity={10} />

          <Suspense fallback={null}>
            <Model3D key={logoModel.name} model={logoModel} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={8}
            autoRotate={true}
            autoRotateSpeed={4}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </View>

      <Text style={styles.mainText}>Build your day with<Text style={styles.title}> Worka</Text></Text>

      <TouchableOpacity style={styles.button} onPress={() => { router.push("/planning") }}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  modelContainer: {
    width: '100%',
    height: '70%',
  },
  mainText: {
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    marginTop: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: theme.fonts.title2,
  },
  button: {
    backgroundColor: theme.colors.secondaryAccent,
    padding: 15,
    borderRadius: 3,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: theme.fonts.secondary,
    color: theme.colors.onSecondaryAccent,
    fontSize: 18,
    textAlign: 'center',
  },
});
import { Ballet_400Regular } from "@expo-google-fonts/ballet";
import { EBGaramond_400Regular, EBGaramond_700Bold } from "@expo-google-fonts/eb-garamond";
import { GravitasOne_400Regular } from "@expo-google-fonts/gravitas-one";
import { Unbounded_400Regular } from "@expo-google-fonts/unbounded";
import { Urbanist_300Light, Urbanist_400Regular, Urbanist_600SemiBold, Urbanist_700Bold, Urbanist_800ExtraBold } from "@expo-google-fonts/urbanist";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_700Bold,
    Unbounded_400Regular,
    GravitasOne_400Regular,
    Ballet_400Regular,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modals/add-task"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="modals/add-objective"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

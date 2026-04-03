import {
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
} from "@expo-google-fonts/urbanist";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useThemeStore } from "@/src/store/themeStore";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "@/src/lib/supabase";
import { getProfile } from "@/src/services/auth";
import { useUserStore } from "@/src/store/userStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
  });

  const themeMode = useThemeStore((s) => s.mode);
  const router = useRouter();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Auth state listener — drives navigation for the entire app.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "INITIAL_SESSION") {
          if (session) {
            const profile = await getProfile(session.user.id);
            if (profile) {
              useUserStore.getState().setUser({
                name: profile.name ?? "",
                email: profile.email ?? session.user.email ?? "",
                avatarUrl: profile.avatar_url ?? null,
                isLoggedIn: true,
              });
            }
            router.replace("/(tabs)/planning");
          }
          // No session → stay on WelcomePage (index), no navigation needed.
        } else if (event === "SIGNED_IN" && session) {
          const profile = await getProfile(session.user.id);
          if (profile) {
            useUserStore.getState().setUser({
              name: profile.name ?? "",
              email: profile.email ?? session.user.email ?? "",
              avatarUrl: profile.avatar_url ?? null,
              isLoggedIn: true,
            });
          }
          router.replace("/(tabs)/planning");
        } else if (event === "SIGNED_OUT") {
          useUserStore.getState().logout();
          router.replace("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modals/archive"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="modals/add-task"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="modals/add-objective"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="profile" />
        <Stack.Screen
          name="modals/task-themes"
          options={{ presentation: "transparentModal", animation: "slide_from_bottom" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

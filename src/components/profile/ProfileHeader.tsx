import { UserCircle } from "@/src/components/ui/Icons";
import { useTheme } from "@/src/hooks/useTheme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
  const { colors, fonts } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 350 }}
      style={styles.container}
    >
      <View style={[styles.avatar, { backgroundColor: colors.accentSoft }]}>
        <UserCircle size={80} color={colors.accent} />
      </View>
      <Text style={[styles.name, { fontFamily: fonts.bold, color: colors.text }]}>{name}</Text>
      <Text style={[styles.email, { fontFamily: fonts.regular, color: colors.textSecondary }]}>
        {email}
      </Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
  },
  email: {
    fontSize: 15,
    marginTop: 4,
  },
});

import { UserCircle } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <View style={styles.profileHeader}>
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        style={styles.avatarContainer}
      >
        <UserCircle size={100} color={theme.colors.onPrimary} />
        <TouchableOpacity style={styles.editBadge}>
          <View style={styles.editBadgeInner} />
        </TouchableOpacity>
      </MotiView>

      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 60,
    padding: 10,
  },
  editBadge: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editBadgeInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.violet,
  },
  userName: {
    fontSize: 28,
    fontFamily: theme.fonts.urbanistBold,
    color: theme.colors.onPrimary,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: theme.fonts.urbanist,
    color: "#888",
    marginTop: 4,
  },
});

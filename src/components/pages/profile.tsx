import { GradientPageLayout } from "@/src/components/shared";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useTheme } from "@/src/hooks/useTheme";
import { useObjectiveStore } from "@/src/store/objectiveStore";
import { useTaskStore } from "@/src/store/taskStore";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

// Back arrow
const BackIcon = ({ size = 20, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Archive icon
const ArchiveIcon = ({ size = 18, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 4h18v4H3zM5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 12h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// Palette icon
const PaletteIcon = ({ size = 18, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 9 9c0 2.5-2 4-4 4h-2c-1 0-2 .5-2 2s1 2 1 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="7.5" cy="10.5" r="1.5" fill={color} />
    <Circle cx="12" cy="7.5" r="1.5" fill={color} />
    <Circle cx="16.5" cy="10.5" r="1.5" fill={color} />
  </Svg>
);

// Settings icon
const SettingsIcon = ({ size = 18, color = "#1C1C1E" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke={color} strokeWidth="1.8" />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="1.8" />
  </Svg>
);

// Logout icon
const LogoutIcon = ({ size = 18, color = "#D96B5A" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ChevronRight
const ChevronRight = ({ size = 16, color = "#C8C0B8" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);


const USER = { name: "Thomas Delon", email: "thomas.d@worka.io", initials: "TD" };

function StatCard({ value, label, bg, accent, delay }: { value: string; label: string; bg: string; accent: string; delay: number }) {
  const { fonts } = useTheme();
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay, damping: 18, stiffness: 200 }}
      style={[styles.statCard, { backgroundColor: bg }]}
    >
      <Text style={[styles.statValue, { color: accent, fontFamily: fonts.extraBold }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: "#9A9088", fontFamily: fonts.regular }]}>{label}</Text>
    </MotiView>
  );
}

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  labelColor?: string;
  right?: React.ReactNode;
  noBorder?: boolean;
}

function MenuRow({ icon, label, onPress, labelColor, right, noBorder }: MenuRowProps) {
  const { colors, fonts } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.menuRow, !noBorder && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.65}
    >
      <View style={styles.menuLeft}>
        {icon}
        <Text style={[styles.menuLabel, { color: labelColor ?? colors.text, fontFamily: fonts.semiBold }]}>
          {label}
        </Text>
      </View>
      {right ?? <ChevronRight size={16} color={colors.textMuted} />}
    </TouchableOpacity>
  );
}

export default function Profile() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const tasks = useTaskStore((s) => s.tasks);
  const objectives = useObjectiveStore((s) => s.objectives);

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completedObjectives = objectives.filter((o) => o.completed).length;
  const productivity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <View style={styles.container}>
      <GradientPageLayout>
        {/* Back button */}
        <View style={styles.topNav}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <BackIcon size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: colors.text, fontFamily: fonts.bold }]}>
            Profil
          </Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Avatar */}
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            style={styles.avatarSection}
          >
            <View style={[styles.avatarCircle, { backgroundColor: "#BEC8E8" }]}>
              <Text style={[styles.avatarInitials, { fontFamily: fonts.extraBold, color: "#5868B0" }]}>
                {USER.initials}
              </Text>
            </View>
            <Text style={[styles.userName, { color: colors.text, fontFamily: fonts.bold }]}>
              {USER.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              {USER.email}
            </Text>
          </MotiView>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatCard
              value={completedTasks.toString()}
              label="Tâches"
              bg="#DEDE7040"
              accent="#9A8A00"
              delay={100}
            />
            <StatCard
              value={completedObjectives.toString()}
              label="Objectifs"
              bg="#BEC8E840"
              accent="#5868B0"
              delay={180}
            />
            <StatCard
              value={`${productivity}%`}
              label="Productivité"
              bg="#A8C8B440"
              accent="#3A7A50"
              delay={260}
            />
          </View>

          {/* Appearance section */}
          <View style={styles.sectionLabel}>
            <Text style={[styles.sectionLabelText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
              APPARENCE
            </Text>
          </View>

          <View style={[styles.menuCard, { backgroundColor: colors.surface }]}>
            <MenuRow
              icon={<View style={[styles.menuIcon, { backgroundColor: "#DEDE7030" }]}><View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#9A8A00" }} /></View>}
              label="Mode sombre"
              right={<ThemeToggle />}
            />
            <MenuRow
              icon={<View style={[styles.menuIcon, { backgroundColor: "#BEC8E830" }]}><PaletteIcon size={16} color="#5868B0" /></View>}
              label="Thèmes de catégories"
              onPress={() => router.push("/modals/task-themes")}
              noBorder
            />
          </View>

          {/* Data section */}
          <View style={styles.sectionLabel}>
            <Text style={[styles.sectionLabelText, { color: colors.textSecondary, fontFamily: fonts.semiBold }]}>
              DONNÉES
            </Text>
          </View>

          <View style={[styles.menuCard, { backgroundColor: colors.surface }]}>
            <MenuRow
              icon={<View style={[styles.menuIcon, { backgroundColor: "#E8D0BC40" }]}><ArchiveIcon size={16} color="#906040" /></View>}
              label="Archives"
              onPress={() => router.push("/modals/archive")}
            />
            <MenuRow
              icon={<View style={[styles.menuIcon, { backgroundColor: "#A8C8B440" }]}><SettingsIcon size={16} color="#3A7A50" /></View>}
              label="Paramètres"
              onPress={() => {}}
              noBorder
            />
          </View>

          {/* Logout */}
          <View style={styles.sectionLabel} />
          <View style={[styles.menuCard, { backgroundColor: colors.surface }]}>
            <MenuRow
              icon={<View style={[styles.menuIcon, { backgroundColor: "#F4DDD940" }]}><LogoutIcon size={16} color="#D96B5A" /></View>}
              label="Se déconnecter"
              labelColor="#D96B5A"
              onPress={() => {}}
              noBorder
              right={null}
            />
          </View>

        </ScrollView>
      </GradientPageLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  pageTitle: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 8,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  avatarInitials: {
    fontSize: 28,
  },
  userName: {
    fontSize: 22,
  },
  userEmail: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    lineHeight: 26,
  },
  statLabel: {
    fontSize: 11,
  },
  sectionLabel: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  sectionLabelText: {
    fontSize: 11,
    letterSpacing: 1.2,
  },
  menuCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
  },
  accentPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  accentDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

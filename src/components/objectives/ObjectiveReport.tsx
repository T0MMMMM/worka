import { useTheme } from "@/src/hooks/useTheme";
import { Objective } from "@/src/types/objective";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const RING = 120;
const STROKE = 10;
const R = (RING - STROKE) / 2;
const C = RING / 2;
const CIRC = 2 * Math.PI * R;

export function ObjectiveReport({ objectives }: { objectives: Objective[] }) {
  const { colors, fonts } = useTheme();

  const total = objectives.length;
  const completed = objectives.filter((o) => o.completed).length;
  const urgent = objectives.filter((o) => !o.completed && o.daysLeft <= 7).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const arc = (CIRC * pct) / 100;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        {/* Progress ring */}
        <View style={styles.ringWrap}>
          <Svg width={RING} height={RING}>
            <Circle cx={C} cy={C} r={R} stroke={colors.elevated} strokeWidth={STROKE} fill="none" />
            <Circle
              cx={C} cy={C} r={R}
              stroke="#7B6FCC"
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={`${arc} ${CIRC}`}
              strokeLinecap="round"
              transform={`rotate(-90, ${C}, ${C})`}
            />
          </Svg>
          <View style={styles.ringCenter}>
            <Text style={[styles.ringPct, { color: colors.text, fontFamily: fonts.extraBold }]}>{pct}%</Text>
            <Text style={[styles.ringLbl, { color: colors.textMuted, fontFamily: fonts.regular }]}>terminé</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>Votre{"\n"}rapport</Text>
          <Text style={[styles.sub, { color: colors.textSecondary, fontFamily: fonts.light }]}>d'objectifs</Text>
          <View style={styles.stats}>
            {[
              { label: "Terminés", value: completed, color: colors.success },
              { label: "Urgents",  value: urgent,    color: colors.danger },
              { label: "Total",    value: total,     color: colors.textSecondary },
            ].map(({ label, value, color }) => (
              <View key={label} style={styles.stat}>
                <Text style={[styles.statVal, { color, fontFamily: fonts.extraBold }]}>{value}</Text>
                <Text style={[styles.statLbl, { color: colors.textSecondary, fontFamily: fonts.regular }]}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 24,
    marginTop: 2,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 20 },
  ringWrap: { width: RING, height: RING, alignItems: "center", justifyContent: "center" },
  ringCenter: { position: "absolute", alignItems: "center" },
  ringPct: { fontSize: 24, lineHeight: 28 },
  ringLbl: { fontSize: 10, marginTop: 1 },
  info: { flex: 1 },
  title: { fontSize: 22, lineHeight: 26 },
  sub: { fontSize: 16, marginBottom: 14 },
  stats: { gap: 5 },
  stat: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  statVal: { fontSize: 17 },
  statLbl: { fontSize: 12 },
});

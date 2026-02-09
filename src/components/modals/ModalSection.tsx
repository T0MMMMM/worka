import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface ModalSectionProps {
    label: string;
    children: React.ReactNode;
    style?: ViewStyle;
}

export function ModalSection({ label, children, style }: ModalSectionProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontFamily: theme.fonts.urbanistBold,
        color: theme.colors.textSecondary,
        marginBottom: 10,
    },
});

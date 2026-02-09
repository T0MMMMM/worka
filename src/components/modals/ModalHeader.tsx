import { X } from "@/src/components/ui/Icons";
import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
    icon?: React.ReactNode;
}

export function ModalHeader({ title, onClose, icon }: ModalHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={20} color="#666" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F2F2F7",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.urbanistBold,
        color: theme.colors.text,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F2F2F7",
        justifyContent: "center",
        alignItems: "center",
    },
});

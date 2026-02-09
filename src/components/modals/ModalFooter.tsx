import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalFooterProps {
    onPress: () => void;
    label: string;
}

export function ModalFooter({ onPress, label }: ModalFooterProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.footer,
                { paddingBottom: Math.max(insets.bottom, 16) + 10 },
            ]}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.separator,
        backgroundColor: theme.colors.card,
    },
    button: {
        backgroundColor: theme.colors.text,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontFamily: theme.fonts.urbanistBold,
    },
});

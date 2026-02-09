import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface ModalInputProps extends TextInputProps {
    label: string;
}

export function ModalInput({ label, style, ...props }: ModalInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor="#999"
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: theme.fonts.urbanistBold,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        fontSize: 17,
        fontFamily: theme.fonts.urbanistSemiBold,
        backgroundColor: "#F2F2F7",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: theme.colors.text,
    },
});

import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/src/constants/theme";

export default function Objectives() {
    const router = useRouter();
    return <SafeAreaView style={styles.container}>
        <Text>Objectives</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
});

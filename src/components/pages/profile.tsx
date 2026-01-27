import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/src/constants/theme";

export default function Profile() {
    const router = useRouter();
    return <SafeAreaView style={styles.container}>
        <Text>Profile</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
});

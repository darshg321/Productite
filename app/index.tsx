import {Text, View, StyleSheet, ScrollView, Pressable} from "react-native";
import {router} from "expo-router";

export default function Index() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to the Productivity App</Text>
            <Text style={styles.description}>
                This app helps you manage your tasks, track your time, and achieve your goals. Here are some of the features:
            </Text>
            <View style={styles.featureContainer}>
                <Pressable onPress={() => router.push({ pathname: "/TodoList" })}>
                    <Text style={styles.featureTitle}>Todo List</Text>
                    <Text style={styles.featureDescription}>
                        - Create and manage your daily tasks.
                        - Add repeat items for everyday tasks.
                        - Add due dates and reminders with notifications.
                    </Text>
                </Pressable>
            </View>
            <Pressable onPress={() => alert("This is an upcoming feature not implemented yet. Check back later.")}>
                <View style={styles.featureContainer}>
                    <Text style={styles.featureTitle}>Daily Diary</Text>
                    <Text style={styles.featureDescription}>
                        - Keep a daily diary of your activities.
                        - Sync with the todo list and time tracker.
                        - View weekly and monthly summaries.
                    </Text>
                </View>
            </Pressable>
            <Pressable onPress={() => router.push({ pathname: "/TimeTracker" })}>
                <View style={styles.featureContainer}>
                    <Text style={styles.featureTitle}>Time Tracker</Text>
                    <Text style={styles.featureDescription}>
                        - Track your time spent on various activities.
                        - Export data to graphs and view specific timeframes.
                        - Add timestamps to activities and edit history.
                    </Text>
                </View>
            </Pressable>
            <Pressable onPress={() => alert("This is an upcoming feature not implemented yet. Check back later.")}>
                <View style={styles.featureContainer}>
                    <Text style={styles.featureTitle}>Goals</Text>
                    <Text style={styles.featureDescription}>
                        - Set and track goals for the time spent on different activities.
                    </Text>
                </View>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    featureContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: "100%",
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    featureDescription: {
        fontSize: 14,
        color: "#666",
    },
});
import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { TodoItem } from "@/src/types";

export default function TodoListBox(props: TodoItem) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.taskText}>
                    {props.todoName}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.timeText}>
                    {props.dueTime ? new Date(props.dueTime).toLocaleString().slice(0, 16) + " " +
                        new Date(props.dueTime).toLocaleString().slice(20) : "No due time"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    taskText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginRight: 8,
    },
});
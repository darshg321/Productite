import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { icons } from "@/src/Utils";
import { TaskItem } from "@/src/types";

export default function TaskListBox(props: TaskItem) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icons[props.icon as keyof typeof icons]} />
            <View style={styles.textContainer}>
                <Text style={styles.taskName}>{props.taskName}</Text>
                <Text style={styles.category}>{props.category || "Uncategorized"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    taskName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#8E8E93',
    },
});
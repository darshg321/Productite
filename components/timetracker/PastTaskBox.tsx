import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { PastTaskData, TaskItem } from "@/src/types";
import { icons, msToTime } from "@/src/Utils";

interface PastTaskBoxProps {
    taskData: PastTaskData;
    taskInfo: TaskItem;
}

export default function PastTaskBox({ taskData, taskInfo }: PastTaskBoxProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={icons[taskInfo.icon as keyof typeof icons]} style={styles.icon} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.taskText} numberOfLines={1} ellipsizeMode="tail">
                        {taskData.taskName}
                    </Text>
                    <Text style={styles.timestamp}>
                        {new Date(taskData.timestamp).toLocaleString().slice(0, 16) + " " + new Date(taskData.timestamp).toLocaleString().slice(20)}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.timeText}>{msToTime(taskData.timeSpent)}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{taskInfo.category || "Uncategorized"}</Text>
                    </View>
                </View>
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
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 16,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
    },
    textContainer: {
        marginBottom: 4,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    timestamp: {
        fontSize: 12,
        color: '#8E8E93',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1C1C1E',
    },
    categoryContainer: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 12,
        color: '#8E8E93',
    },
});
import React from "react";
import { View, StyleSheet, Image, Text, ScrollView, Pressable } from "react-native";
import { icons } from "@/src/Utils";
import { TaskItem } from "@/src/types";

interface TasksGridProps {
    onPress: (taskName: string) => void;
    data: TaskItem[];
}

export default function TasksGrid(props: TasksGridProps) {
    return (
        <ScrollView contentContainerStyle={styles.grid}>
            {props.data.map((item, index) => (
                <Pressable
                    key={index}
                    style={({ pressed }) => [
                        styles.item,
                        pressed && styles.itemPressed
                    ]}
                    onPress={() => props.onPress(item.taskName)}
                >
                    <View style={styles.itemContent}>
                        <Image source={icons[item.icon as keyof typeof icons]} style={styles.icon} />
                        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.taskName}</Text>
                        <Text style={styles.category}>{item.category || "Uncategorized"}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const styles= StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 8,
    },
    item: {
        width: '31%',
        aspectRatio: 1,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    itemPressed: {
        opacity: 0.8,
    },
    itemContent: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        marginBottom: 8,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    category: {
        fontSize: 8,
        textAlign: 'center',
        color: '#8E8E93',
    },
});
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import TaskListBox from "@/components/timetracker/TaskListBox";
import { TaskItem } from "@/src/types";

interface TaskListViewProps {
    data: TaskItem[];
    onPressEdit: (taskName: string) => void;
    onPressDelete: (taskName: string) => void;
}

export default function TaskListView({ data, onPressEdit, onPressDelete }: TaskListViewProps) {
    const renderItem = ({ item }: { item: TaskItem }) => (
        <View style={styles.itemContainer}>
            <View style={styles.taskBoxContainer}>
                <TaskListBox taskName={item.taskName} category={item.category} icon={item.icon} />
            </View>
            <Menu>
                <MenuTrigger>
                    <View style={styles.menuTrigger}>
                        <Entypo name="dots-three-vertical" size={20} color="#8E8E93" />
                    </View>
                </MenuTrigger>
                <MenuOptions customStyles={menuOptionsStyles}>
                    <MenuOption onSelect={() => onPressEdit(item.taskName)}>
                        <View style={styles.menuOption}>
                            <Feather name="edit" size={18} color="#007AFF" />
                            <Text style={styles.menuText}>Edit</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => onPressDelete(item.taskName)}>
                        <View style={styles.menuOption}>
                            <AntDesign name="delete" size={18} color="#FF3B30" />
                            <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.taskName}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    taskBoxContainer: {
        flex: 1,
    },
    menuTrigger: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#1C1C1E',
    },
    deleteText: {
        color: '#FF3B30',
    },
});

const menuOptionsStyles = {
    optionsContainer: {
        borderRadius: 12,
        padding: 0,
        width: 140,
    },
    optionWrapper: {
        padding: 0,
    },
};
import React from "react";
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TodoItem } from "@/src/types";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import {readableTime} from "@/src/Utils";

interface TodoListViewParams {
    todoList: TodoItem[],
    onPressComplete: (todoName: string) => void,
    onPressEdit: (todoName: string) => void,
    onPressDelete: (todoName: string) => void,
}

export default function TodoListView({ todoList, onPressComplete, onPressEdit, onPressDelete }: TodoListViewParams) {
    function renderItem({ item }: { item: TodoItem }) {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.taskText}>{item.todoName}</Text>
                    <Text style={styles.timeText}>
                        {item.dueTime ? readableTime(new Date(item.dueTime)) : "No alert"}
                    </Text>
                </View>
                <Menu>
                    <MenuTrigger>
                        <View style={styles.menuTrigger}>
                            <Entypo name="dots-three-vertical" size={20} color="#8E8E93" />
                        </View>
                    </MenuTrigger>
                    <MenuOptions customStyles={menuOptionsStyles}>
                        <MenuOption onSelect={() => onPressComplete(item.todoName)}>
                            <View style={styles.menuOption}>
                                <Feather name="check-square" size={18} color="#34C759" />
                                <Text style={[styles.menuText, styles.completeText]}>Complete</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={() => onPressEdit(item.todoName)}>
                            <View style={styles.menuOption}>
                                <Feather name="edit" size={18} color="#007AFF" />
                                <Text style={styles.menuText}>Edit</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={() => onPressDelete(item.todoName)}>
                            <View style={styles.menuOption}>
                                <AntDesign name="delete" size={18} color="#FF3B30" />
                                <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={todoList}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    contentContainer: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkboxContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    menuTrigger: {
        padding: 8,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    menuText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#000000',
    },
    completeText: {
        color: '#34C759',
    },
    deleteText: {
        color: '#FF3B30',
    },
});

const menuOptionsStyles = {
    optionsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
};
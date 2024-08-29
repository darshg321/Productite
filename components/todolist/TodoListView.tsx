import React from "react";
import {FlatList, View, StyleSheet, Text} from "react-native";
import {TodoItem} from "@/src/types";
import Entypo from '@expo/vector-icons/Entypo';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {AntDesign, Feather} from "@expo/vector-icons";

interface TodoListViewParams {
    todoList: TodoItem[],
    onPressComplete: (todoName: string) => void,
    onPressEdit: (todoName: string) => void,
    onPressDelete: (todoName: string) => void,
}

export default function TodoListView({todoList, onPressComplete, onPressEdit, onPressDelete}: TodoListViewParams) {
    function renderItem({item}: { item: TodoItem }) {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.taskText}>
                        {item.todoName}
                    </Text>
                    <Text style={styles.timeText}>
                        {item.dueTime ? new Date(item.dueTime).toLocaleString().slice(0, 16) + " " +
                            new Date(item.dueTime).toLocaleString().slice(20) : "No alert"}
                    </Text>
                </View>
                <Menu>
                    <MenuTrigger>
                        <View style={styles.menuTrigger}>
                            <Entypo name="dots-three-vertical" size={20} color="#8E8E93"/>
                        </View>
                    </MenuTrigger>
                    <MenuOptions customStyles={menuOptionsStyles}>
                        <MenuOption onSelect={() => onPressComplete(item.todoName)}>
                            <View style={styles.menuOption}>
                                <Entypo name="check" size={24} color="#FF3B30"/>
                                <Text style={[styles.menuText, styles.deleteText]}>Complete</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={() => onPressEdit(item.todoName)}>
                            <View style={styles.menuOption}>
                                <Feather name="edit" size={18} color="#007AFF"/>
                                <Text style={styles.menuText}>Edit</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={() => onPressDelete(item.todoName)}>
                            <View style={styles.menuOption}>
                                <AntDesign name="delete" size={18} color="#FF3B30"/>
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
        backgroundColor: '#000000',
    },
    contentContainer: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#1C1C1E',
        borderRadius: 12,
    },
    textContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#8E8E93',
    },
});
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import TodoListBox from "@/components/todolist/TodoListBox";
import { TodoItem } from "@/src/types";

export default function TodoListView(props: { todoList: TodoItem[] }) {
    function renderItem({ item }: { item: TodoItem }) {
        return (
            <TodoListBox
                todoName={item.todoName}
                dueTime={item.dueTime}
                isCompleted={item.isCompleted}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={props.todoList}
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
        flexGrow: 1,
        padding: 16,
    },
});
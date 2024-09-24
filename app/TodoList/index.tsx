import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, FlatList} from "react-native";
import { router } from "expo-router";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";
import {
    completeTodoItem,
    deleteTodoItem,
    getCurrentTodoList,
    getOverdueTodoList,
    getCompletedTodoList,
    storeTodoItem
} from "@/src/Database/db";
import { TodoItem } from "@/src/types";

export default function TodoList() {
    const [todoName, setTodoName] = useState<string>('');
    const [todoLists, setTodoLists] = useState<{ title: string; data: TodoItem[] }[]>([]);

    function fetchTodoLists() {
        Promise.all([
            getOverdueTodoList(),
            getCurrentTodoList(),
            getCompletedTodoList()
        ]).then(([overdue, current, completed]) => {
            setTodoLists([
                { title: "Overdue", data: overdue },
                { title: "Current", data: current },
                { title: "Completed", data: completed }
            ]);
        });
    }

    useEffect(() => {
        fetchTodoLists();
    }, []);

    function createTask() {
        if (todoName.trim()) {
            storeTodoItem({todoName: todoName.trim(), dueTime: null, isCompleted: 0}).then(() => {
                fetchTodoLists();
                setTodoName('');
            });
        } else {
            router.push({pathname: '/TodoList/EditTodo', params: {todoName: undefined}});
        }
    }

    function completeTodo(todoName: string) {
        completeTodoItem(todoName).then(() => fetchTodoLists());
    }

    function editTodo(todoName: string) {
        router.push({pathname: '/TodoList/EditTodo', params: { todoName: todoName }});
    }

    function deleteTodo(todoName: string) {
        deleteTodoItem(todoName).then(() => fetchTodoLists());
    }

    const renderItem = ({ item }: { item: { title: string; data: TodoItem[] } }) => (
        <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <TodoListView
                todoList={item.data}
                onPressComplete={completeTodo}
                onPressEdit={editTodo}
                onPressDelete={deleteTodo}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={todoLists}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                ListFooterComponent={
                    <View style={styles.createTaskContainer}>
                        <TodoCreate onChangeText={setTodoName} onCreateTask={createTask} value={todoName} />
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        padding: 16,
    },
    scrollView: {
        flex: 1,
    },
    listContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    createTaskContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
});
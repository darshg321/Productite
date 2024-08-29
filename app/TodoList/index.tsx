import { View, StyleSheet } from "react-native";
import {router, useGlobalSearchParams} from "expo-router";
import React, {useEffect, useReducer} from "react";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";
import {completeTodoItem, deleteTodoItem, getTodoList, storeTodoItem} from "@/src/Database/db";
import { TodoItem } from "@/src/types";
import {MenuProvider} from "react-native-popup-menu";

export default function TodoList() {
    const [todoName, setTodoName] = React.useState<string>('');
    const [todoList, setTodoList] = React.useState<TodoItem[]>([]);

    useEffect(() => {
        getTodoList().then(r => setTodoList(r));
    }, []);

    function createTask() {
        if (todoName) {
            storeTodoItem({todoName: todoName, dueTime: null, isCompleted: false}).then(async () => {
                getTodoList().then(r => setTodoList(r));
            });
            setTodoName('');
        } else {
            router.setParams({todoName: ''});
            router.push('/TodoList/EditTodo');
        }
    }

    function completeTodo(todoName: string) {
        completeTodoItem(todoName).then(async () => {
            getTodoList().then(r => setTodoList(r));
        });
    }

    function editTodo(todoName: string) {
        router.setParams({todoName: todoName});
        router.push('/TodoList/EditTodo');
    }

    function deleteTodo(todoName: string) {
        deleteTodoItem(todoName).then(async () => {
            getTodoList().then(r => setTodoList(r));
        });
    }

    return (
        <View style={styles.container}>
            <MenuProvider>
                <View style={{flex: 1}}>
                    <TodoListView todoList={todoList} onPressComplete={completeTodo} onPressEdit={editTodo} onPressDelete={deleteTodo}/>
                </View>
            </MenuProvider>
            <TodoCreate onChangeText={setTodoName} onCreateTask={createTask} value={todoName} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
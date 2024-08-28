import {View, StyleSheet} from "react-native";
import {router} from "expo-router";
import React, {useEffect} from "react";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";
import {getTodoList, storeTodoItem} from "@/src/Database/db";
import {TodoItem} from "@/src/types";

export default function TodoList() {
    const [todoName, setTodoName] = React.useState<string>('');
    const [todoList, setTodoList] = React.useState<TodoItem[]>([]);

    useEffect(() => {
        getTodoList().then(r => setTodoList(r));
    }, []);

    console.log(todoName);

    function createTask() {
        if (todoName === '') {
            router.setParams({ todoName: todoName });
            router.push('/TodoList/EditTodo');
        } else {
            storeTodoItem({ todoName: todoName, dueTime: null, isCompleted: false }).then(async () => {
                getTodoList().then(r => setTodoList(r));
            });
            setTodoName('');
        }
    }

    return (
        <View>
            <TodoListView todoList={todoList} />
            <TodoCreate onChangeText={setTodoName} onCreateTask={createTask} value={todoName} />
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 5,
    },
});
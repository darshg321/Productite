import {View, StyleSheet} from "react-native";
import {router} from "expo-router";
import React, {useEffect} from "react";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";


export default function TodoList() {
    const [todoName, setTodoName] = React.useState('');

    useEffect(() => {

    }, []);

    function createTask() {
        router.setParams({ todoName: todoName });
        router.push('EditTodo');
    }

    return (
        <View>
            <TodoListView todoList={}
            <TodoCreate onChangeText={setTodoName} onCreateTask={createTask} />
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
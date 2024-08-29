import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";
import { getTodoList, storeTodoItem } from "@/src/Database/db";
import { TodoItem } from "@/src/types";

export default function TodoList() {
    const [todoName, setTodoName] = React.useState<string>('');
    const [todoList, setTodoList] = React.useState<TodoItem[]>([]);
    const [refresh, setRefresh] = React.useState<boolean>(false);

    useEffect(() => {
        getTodoList().then(r => setTodoList(r));
    }, [refresh]);

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

    return (
        <View style={styles.container}>
            {/*<View>*/}
                <TodoListView todoList={todoList} />
            {/*</View>*/}
            <TodoCreate onChangeText={setTodoName} onCreateTask={createTask} value={todoName} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
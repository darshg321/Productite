import { View, StyleSheet } from "react-native";
import {router, useFocusEffect} from "expo-router";
import TodoCreate from "@/components/todolist/TodoCreate";
import TodoListView from "@/components/todolist/TodoListView";
import {completeTodoItem, deleteTodoItem, getTodoList, storeTodoItem} from "@/src/Database/db";
import { TodoItem } from "@/src/types";
import {MenuProvider} from "react-native-popup-menu";
import {useState} from "react";

export default function TodoList() {
    const [todoName, setTodoName] = useState<string>('');
    const [todoList, setTodoList] = useState<TodoItem[]>([]);

    useFocusEffect(() => {
        getTodoList().then(r => setTodoList(r));
    });

    function createTask() {
        if (todoName) {
            storeTodoItem({todoName: todoName, dueTime: null, isCompleted: false}).then(async () => {
                getTodoList().then(r => setTodoList(r));
            });
            setTodoName('');
        } else {
            router.push({pathname: '/TodoList/EditTodo', params: {todoName: undefined}});
        }
    }

    function completeTodo(todoName: string) {
        completeTodoItem(todoName).then(async () => {
            getTodoList().then(r => setTodoList(r));
        });
    }

    function editTodo(todoName: string) {
        router.push({pathname: '/TodoList/EditTodo', params: { todoName: todoName }});
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
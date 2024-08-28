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
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentContainer: {
        flexGrow: 1,
    },
});
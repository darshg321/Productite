import { useState } from "react";
import {View, StyleSheet, Pressable} from "react-native";
import {router, useFocusEffect} from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { MenuProvider } from "react-native-popup-menu";
import { deleteTaskFromTaskList, getTaskList } from "@/src/Database/db";
import TaskListView from "@/components/timetracker/TaskListView";
import { TaskItem } from "@/src/types";

export default function TaskList() {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    useFocusEffect(() => {
        getTaskList().then(r => setTaskList(r as TaskItem[]));
    });

    function deleteTask(taskName: string) {
        deleteTaskFromTaskList(taskName);
        setTaskList(taskList.filter(task => task.taskName !== taskName));
    }

    function editTask(taskName: string) {
        router.push({
            pathname: '../EditTask',
            params: { taskName: taskName }
        });
    }

    return (
        <View style={styles.container}>
            <MenuProvider>
                <View style={styles.taskListViewContainer}>
                    <TaskListView data={taskList} onPressEdit={editTask} onPressDelete={deleteTask} />
                </View>
            </MenuProvider>
            <Pressable
                style={styles.addButton}
                onPress={() => { router.push('../EditTask'); }}
            >
                <AntDesign name="pluscircle" size={56} color="#007AFF" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 16,
    },
    taskListViewContainer: {
        flex: 1,
        width: '100%',
    },
    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: 'white',
        borderRadius: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});
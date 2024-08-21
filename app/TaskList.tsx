import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { deleteTaskFromTaskList, getTaskList } from "@/src/Database/db";
import TaskListView from "@/components/timetracker/TaskListView";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import { TaskItem } from "@/src/types";

export default function TaskList() {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    useEffect(() => {
        getTaskList().then(r => setTaskList(r as TaskItem[]));
    }, []);

    function deleteTask(taskName: string) {
        deleteTaskFromTaskList(taskName);
        setTaskList(taskList.filter(task => task.taskName !== taskName));
    }

    function editTask(taskName: string) {
        router.setParams({ taskName: taskName });
        router.push('/EditTask');
    }

    return (
        <View style={styles.container}>
            <MenuProvider>
                <View style={styles.taskListViewContainer}>
                    <TaskListView data={taskList} onPressEdit={editTask} onPressDelete={deleteTask} />
                </View>
            </MenuProvider>
            <AntDesign style={styles.addButton} name="pluscircleo" size={40} color="#61dafb" onPress={() => { router.push('/EditTask'); }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    taskListViewContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});
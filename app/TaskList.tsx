import { View, StyleSheet } from "react-native";
import {useState} from "react";
import {deleteTaskFromTaskList, getTaskList} from "@/src/Database/db";
import TaskListView from "@/components/timetracker/TaskListView";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";
import {MenuProvider} from "react-native-popup-menu";
import {TaskItem} from "@/src/types";

export default function TaskList() {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    getTaskList().then(r => setTaskList(r as TaskItem[]));

    function deleteTask(taskName: string) {
        deleteTaskFromTaskList(taskName);
    }

    function editTask(taskName: string) {
        router.setParams({taskName: taskName});
        router.push('/EditTask');
    }

    return (
        <View style={styles.container}>
            <MenuProvider>
                <View>
                    <TaskListView data={taskList} onPressEdit={editTask} onPressDelete={deleteTask}/>
                </View>
            </MenuProvider>
            <AntDesign name="pluscircleo" size={24} color="black" onPress={() => {router.push('/EditTask');}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
});

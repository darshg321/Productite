import { View, StyleSheet } from "react-native";
import {useEffect, useState} from "react";
import {deleteTaskFromTaskList, getTaskList} from "@/src/Database/db";
import TaskListView from "@/components/timetracker/TaskListView";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";
import {MenuProvider} from "react-native-popup-menu";

export default function TaskList() {
    const [taskList, setTaskList] = useState([]);

    getTaskList().then(data => setTaskList(data));

    function deleteTask(task) {
        deleteTaskFromTaskList(task);
    }

    function editTask(task) {
        router.setParams({taskName: task});
        router.push('/EditTask');
    }

    return (
        <View>
            <MenuProvider style={styles.container}>
                <TaskListView data={taskList} onPressEdit={editTask} onPressDelete={deleteTask}/>
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

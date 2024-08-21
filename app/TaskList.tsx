import { View } from "react-native";
import {useState} from "react";
import {deleteTaskFromTaskList, getTaskList} from "@/src/Database/db";
import TaskListView from "@/components/timetracker/TaskListView";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";

export default function TaskList() {
    const [taskList, setTaskList] = useState([]);

    function deleteTask(task) {
        deleteTaskFromTaskList(task);
    }

    function editTask(task) {
        router.push('/EditTask', {task: task});
    }

    getTaskList().then(data => setTaskList(data));

    return (
        <View>
            <TaskListView data={taskList} onPressEdit={() => {}} onPressDelete={deleteTask}/>
            <AntDesign name="pluscircleo" size={24} color="black" onPress={() => router.push('/CreateTask')}/>
        </View>
    )
}
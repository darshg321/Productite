import { View } from "react-native";
import {useState} from "react";
import {getTaskList} from "@/src/Database/db";
import EditTasksView from "@/components/timetracker/EditTasksView";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";

export default function EditTasks() {
    const [taskList, setTaskList] = useState([]);

    getTaskList().then(data => setTaskList(data));

    return (
        <View>
            <EditTasksView data={taskList}/>
            <AntDesign name="pluscircleo" size={24} color="black" onPress={() => router.push('/CreateTask')}/>
        </View>
    )
}
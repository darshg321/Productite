import { View } from "react-native";
import {useState} from "react";
import {getTaskList} from "@/src/Database/db";

export default function EditTasks() {
    const [taskList, setTaskList] = useState([]);

    getTaskList().then(data => setTaskList(data));

    return (
        <View>

        </View>
    )
}
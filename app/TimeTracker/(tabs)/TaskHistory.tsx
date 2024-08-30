import PastTasksView from "@/components/timetracker/PastTasksView";
import {useState} from "react";
import {getPastTasks} from "@/src/Database/db";
import {PastTaskData} from "@/src/types";
import {useFocusEffect} from "expo-router";

export default function TaskHistory() {
    const [pastTasks, setPastTasks] = useState<PastTaskData[]>([]);

    useFocusEffect(() => {
        getPastTasks().then(r => setPastTasks(r as PastTaskData[]));
    });

    return (
        <PastTasksView data={pastTasks}/>
    );
}
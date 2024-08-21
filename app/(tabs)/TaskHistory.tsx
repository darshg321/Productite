import PastTasksView from "@/components/timetracker/PastTasksView";
import {useState} from "react";
import {getPastTasks} from "@/src/Database/db";
import {PastTaskData} from "@/src/types";

export default function TaskHistory() {
    const [pastTasks, setPastTasks] = useState<PastTaskData[]>([]);

    // FIXME bad performance
    getPastTasks().then(r => setPastTasks(r as PastTaskData[]));

    return (
        <PastTasksView data={pastTasks}/>
    );
}
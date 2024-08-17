import PastTasksView from "@/components/timetracker/PastTasksView";
import {useState} from "react";
import {getPastTasks} from "@/src/Database/db";

export default function TaskHistory() {
    const [pastTasks, setPastTasks] = useState([]);

    // FIXME bad performance
    getPastTasks().then(data => {
        setPastTasks(data);
    });

    return (
        <PastTasksView data={pastTasks}/>
    );
}
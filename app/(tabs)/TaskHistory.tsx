import PastTasksView from "@/components/timetracker/PastTasksView";
import {useEffect, useState} from "react";
import {getPastTasks} from "@/src/Database/db";

export default function TaskHistory() {
    const [pastTasks, setPastTasks] = useState([]);

    // useEffect(() => {
    //     getPastTasks().then(data => {
    //         setPastTasks(data);
    //     });
    // }, []);
    // FIXME bad performance
    getPastTasks().then(data => {
        setPastTasks(data);
    });

    return (
        <PastTasksView data={pastTasks}/>
    );
}
import {View} from "react-native";
import {PieChart} from "react-native-gifted-charts";
import {useEffect, useState} from "react";
import {runCustomGetAll} from "@/src/Database/db";

function taskDataToPieChartData(taskData) {
    return taskData.map((task) => {
        return {
            text: task.task,
            value: task.time,
            color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        }
    });
}

export function TasksPieChart(props) {
    let [taskData, setTaskData] = useState([]);

    useEffect(() => {
        runCustomGetAll('SELECT task, SUM(time) as time FROM pastTasks GROUP BY task;').then(r => setTaskData(r))
        console.log(taskDataToPieChartData(taskData));
    }, []);

    return (
        <View>
            <PieChart
                data={taskDataToPieChartData(taskData)}
                radius={205}
                textSize={15}
                textColor={'#000'}
                showText={true}
                strokeColor={'#000'}
                strokeWidth={1}
            />
        </View>
    )
}
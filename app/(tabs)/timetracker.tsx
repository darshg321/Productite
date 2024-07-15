import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {Stopwatch} from "@/components/Stopwatch/Stopwatch";
import {useState} from "react";
import TaskButton from "@/components/Stopwatch/TaskButton";

export enum TaskStatus {
    notStarted,
    running,
    paused,
    finished
}

function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export default function Timetracker() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [task, setTask] = useState("");
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);

    function startTask() {
        setStartTime(Date.now());
        setTaskStatus(TaskStatus.running);
    //     do something with task here
    //     start foreground service
    //     set timer to 0
    }
    function stopTask() {
        console.log(Date.now() - startTime);
        setTime(Date.now() - startTime);
        console.log(msToTime(Date.now()+time-startTime));
        setStartTime(0);
        setTaskStatus(TaskStatus.finished)
    }
    function pauseTask() {
        setTaskStatus(TaskStatus.paused);
        if (startTime === Date.now()) {
            setTime(Date.now() - startTime);
            setStartTime(0);
        } else {
            setStartTime(Date.now());
            setTaskStatus(TaskStatus.running);
        }
    }
    return (
        <View style={styles.container}>
            <Stopwatch time={startTime ? (msToTime(Date.now()+time-startTime)) : "00:00:00"}></Stopwatch>
            <TextInput style={styles.input} onChangeText={setTask} placeholder={"Name of Task"} />
            <TaskButton taskStatus={taskStatus} onPressStart={startTask} onPressPause={pauseTask} onPressStop={stopTask}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})


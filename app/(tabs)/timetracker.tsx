import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {Stopwatch} from "@/components/Stopwatch/Stopwatch";
import {useEffect, useState} from "react";
import TaskButton from "@/components/Stopwatch/TaskButton";
import {TaskStatus} from "@/components/Stopwatch/TaskButton";

function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export default function Timetracker() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
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
    //     setStartTime(0);
        setTaskStatus(TaskStatus.finished)
    }
    function pauseTask() {
        setPauseTime(Date.now());
        setTaskStatus(TaskStatus.paused);
    }
    function playTask() {
        setTime(time - pauseTime);
        setPauseTime(0);
        setTaskStatus(TaskStatus.running);
    }
    // if (taskStatus === TaskStatus.running) {
    //     const interval = setInterval(() => {
    //         setTime(time + 1);
    //     }, 1);
    // }
    useEffect(() => {
        let interval = null;

        if (taskStatus === TaskStatus.running) {
            interval = setInterval(() => {
                // Calculate elapsed time without adjusting startTime
                const now = Date.now();
                const pausedDuration = pauseTime ? now - pauseTime : 0;
                setTime(now - startTime - pausedDuration);
            }, 1000); // Update every second
        } else if (taskStatus === TaskStatus.finished || taskStatus === TaskStatus.paused) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [taskStatus, startTime, pauseTime]);

    return (
        <View style={styles.container}>
            <Stopwatch time={startTime | time ? (msToTime(Date.now() - startTime)) : "00:00:00"}></Stopwatch>
            {/*<Stopwatch time={"00:00:00"}></Stopwatch>*/}
            <TextInput style={styles.input} onChangeText={setTask} placeholder={"Name of Task"} />
            <TaskButton taskStatus={taskStatus} onPressStart={startTask} onPressPause={pauseTask} onPressPlay={playTask} onPressStop={stopTask}/>
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
    },
    stopwatch: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

    }
})


import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {Stopwatch} from "@/components/Stopwatch/Stopwatch";
import {useEffect, useState} from "react";
import TaskButton from "@/components/Stopwatch/TaskButton";
import {TaskStatus} from "@/components/Stopwatch/TaskButton";

// add limit to time

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
    const [totalPausedDuration, setTotalPausedDuration] = useState(0);
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);

    function startTask() {
        setTime(0);
        setTotalPausedDuration(0);
        setStartTime(Date.now());
        setTaskStatus(TaskStatus.running);
    }

    function stopTask() {
        setTime(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.finished);
        // Reset paused duration on stop
        //     do something with task here
        //     start foreground service
        //     set timer to 0
    }

    function pauseTask() {
        setPauseTime(Date.now());
        setTaskStatus(TaskStatus.paused);
    }

    function playTask() {
        if (pauseTime !== 0) {
            // Update total paused duration
            setTotalPausedDuration(totalPausedDuration + (Date.now() - pauseTime));
            setPauseTime(0); // Reset pauseTime
        }
        setTaskStatus(TaskStatus.running);
    }

    useEffect(() => {
        let interval = null;

        if (taskStatus === TaskStatus.running) {
            interval = setInterval(() => {
                const now = Date.now();
                setTime(now - startTime - totalPausedDuration);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [taskStatus, startTime, totalPausedDuration]);

    return (
        <View style={styles.container}>
            <Stopwatch time={msToTime(time)}></Stopwatch>
            <TextInput style={styles.input} placeholder={"Name of Task"} />
            <TaskButton taskStatus={taskStatus} onPressStart={startTask} onPressPause={pauseTask} onPressPlay={playTask} onPressStop={stopTask}/>
        </View>
    );
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


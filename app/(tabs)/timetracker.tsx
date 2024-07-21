import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskButton from "@/components/timetracker/TaskButton";
import {TaskStatus} from "@/components/timetracker/TaskButton";
import TimeConfirmationView from "@/components/timetracker/TimeConfirmationView";
import AsyncStorage from '@react-native-async-storage/async-storage';

// add limit to time

async function storeConfirmationData(data) {
    try {
        const existingData = await AsyncStorage.getItem('confirmationData');
        const currentData = existingData ? JSON.parse(existingData) : [];
        const updatedData = [...currentData, data];
        await AsyncStorage.setItem('confirmationData', JSON.stringify(updatedData));
        console.log('Data appended to AsyncStorage:', data);
    } catch (error) {
        console.error('Error appending data to AsyncStorage:', error);
    }
}

function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60),
        minutes = parseInt((duration/(1000*60))%60),
        hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export default function Timetracker() {
    const [taskName, setTaskName] = useState("");
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
    //     start foreground service
    }

    function stopTask() {
        setTime(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.finished);
        // Reset paused duration on stop
        //     do something with task here
        //     set timer to 0
    //     add task and time as confirmation here
        storeConfirmationData([{task: taskName, category: "Category 1", time: msToTime(time)}])
            .then(r => {console.log(r)});

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
            <TextInput style={styles.input} placeholder={"Name of Task"} onChangeText={setTaskName}/>
            <TaskButton taskStatus={taskStatus} onPressStart={startTask} onPressPause={pauseTask} onPressPlay={playTask} onPressStop={stopTask}/>
            <TimeConfirmationView data={confirmationData}/>
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


import {StyleSheet, View} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskStatusButtons, {TaskStatus} from "@/components/timetracker/TaskStatusButtons";
import TasksGrid from "@/components/timetracker/TasksGrid";
import {storeTask} from "@/components/Database/db";

function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60),
        minutes = parseInt((duration/(1000*60))%60),
        hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export default function TimeTracker() {
    const [taskName, setTaskName] = useState("");
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [totalPausedDuration, setTotalPausedDuration] = useState(0);
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);

    function startTask(taskName) {
        setTime(0);
        setTotalPausedDuration(0);
        setStartTime(Date.now());
        setTaskName(taskName)
        setTaskStatus(TaskStatus.running);
        //     start foreground service
    }

    function stopTask() {
        setTime(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.notStarted);
        storeTask(taskName, "Category 1", msToTime(time)) // FIXME add category
        setTime(0);
    }

    function pauseTask() {
        setPauseTime(Date.now());
        setTaskStatus(TaskStatus.paused);
    }

    function playTask() {
        if (pauseTime !== 0) {
            setTotalPausedDuration(totalPausedDuration + (Date.now() - pauseTime));
            setPauseTime(0);
        }
        setTaskStatus(TaskStatus.running);
    }

    useEffect(() => {
        let interval = null;

        if (taskStatus === TaskStatus.running) {
            interval = setInterval(() => {
                const now = Date.now();
                // Stop task if time is over 99 hours
                if (time < 359998900) {
                    setTime(now - startTime - totalPausedDuration);
                } else {
                    stopTask();
                }
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
    // FIXME add mini history here maybe
    return (
        <View style={styles.container}>
            <TasksGrid data={[{taskName: "Science", icon: require("../../assets/images/react-logo.png")},
                {taskName: "Cubing", icon: require("../../assets/images/favicon.png")},
                {taskName: "Archery", icon: require("../../assets/images/splash.png")}]} onPress={(r) => {
                    if (taskStatus == TaskStatus.notStarted) {
                        startTask(r)
                    }}}>
            </TasksGrid>
            <Stopwatch time={msToTime(time)}></Stopwatch>
            <TaskStatusButtons taskStatus={taskStatus} onPressPause={pauseTask} onPressPlay={playTask}
                               onPressStop={stopTask}/>
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


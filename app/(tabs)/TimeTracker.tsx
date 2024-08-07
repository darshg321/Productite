import {StyleSheet, View} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskStatusButtons, {TaskStatus} from "@/components/timetracker/TaskStatusButtons";
import TasksGrid from "@/components/timetracker/TasksGrid";
import {storeTask} from "@/src/Database/db";
import {msToTime} from "@/src/Utils";

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
    }

    function stopTask() {
        setTime(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.notStarted);
        storeTask(taskName, "Category 1", time) // FIXME add category
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

    return (
        <View style={styles.container}>
            <TasksGrid data={[{taskName: "Science", icon: require("../../assets/images/react-logo.png")},
                {taskName: "Cubing", icon: require("../../assets/images/favicon.png")},
                {taskName: "Archery", icon: require("../../assets/images/archery.png")},
                {taskName: "Coding", icon: require("../../assets/images/noun-coding-6985103.png")},
                {taskName: "Basketball", icon: require("../../assets/images/noun-basketball-7063939.png")},]} onPress={(r) => {
                if (taskStatus == TaskStatus.notStarted) {
                    startTask(r)
                }}}>
            </TasksGrid>
            <Stopwatch time={msToTime(time)} style={styles.stopwatch}/>
            <TaskStatusButtons taskStatus={taskStatus} onPressPause={pauseTask} onPressPlay={playTask}
                               onPressStop={stopTask} style={styles.taskStatusButtons}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    stopwatch: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 20,
    },
    taskStatusButtons: {
        marginVertical: 20,
    },
});
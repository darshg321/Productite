import {StyleSheet, View} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskStatusButtons, {TaskStatus} from "@/components/timetracker/TaskStatusButtons";
import TasksGrid from "@/components/timetracker/TasksGrid";
import {getTaskList, storeTask} from "@/src/Database/db";
import {msToTime} from "@/src/Utils";
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from "expo-router";
import {TaskItem} from "@/src/types";

export default function TimeTracker() {
    const [taskName, setTaskName] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [totalPausedDuration, setTotalPausedDuration] = useState(0);
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    getTaskList().then(r => setTaskList(r as TaskItem[]));

    function startTask(taskName: string) {
        setTimeSpent(0);
        setTotalPausedDuration(0);
        setStartTime(Date.now());
        setTaskName(taskName)
        setTaskStatus(TaskStatus.running);
    }

    function stopTask() {
        setTimeSpent(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.notStarted);
        storeTask({taskName, timeSpent, timestamp: Date.now()})
        setTimeSpent(0);
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
        let interval: NodeJS.Timeout;

        if (taskStatus === TaskStatus.running) {
            interval = setInterval(() => {
                const now = Date.now();
                if (timeSpent < 1187900) { // 23 hours 59 minutes 59 seconds
                    setTimeSpent(now - startTime - totalPausedDuration);
                } else {
                    stopTask();
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [taskStatus, startTime, totalPausedDuration]);

    return (
        <View style={styles.container}>
            <TasksGrid data={taskList} onPress={(taskName: string) => {
                if (taskStatus == TaskStatus.notStarted) {
                    startTask(taskName)
                }}}>
            </TasksGrid>
            <Ionicons style={styles.options} name="options" size={40} color="black" onPress={() => router.push("/TaskList")} />
            <Stopwatch time={msToTime(timeSpent)} style={styles.stopwatch}/>
            <TaskStatusButtons style={styles.taskStatusButtons} taskStatus={taskStatus} onPressPause={pauseTask} onPressPlay={playTask}
                               onPressStop={stopTask}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    options: {
        padding: 10,
        marginVertical: 10,
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
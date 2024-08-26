import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stopwatch } from "@/components/timetracker/Stopwatch";
import TaskStatusButtons, { TaskStatus } from "@/components/timetracker/TaskStatusButtons";
import TasksGrid from "@/components/timetracker/TasksGrid";
import { getTaskList, storeTask } from "@/src/Database/db";
import { msToTime } from "@/src/Utils";
import { TaskItem } from "@/src/types";

export default function TimeTracker() {
    const [taskName, setTaskName] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [totalPausedDuration, setTotalPausedDuration] = useState(0);
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    // FIXME doesnt refresh the list after adding a new task probably
    useEffect(() => {
        getTaskList().then(r => setTaskList(r as TaskItem[]));
    }, []);

    function startTask(taskName: string) {
        setTimeSpent(0);
        setTotalPausedDuration(0);
        setTaskStatus(TaskStatus.running);
        setStartTime(Date.now());
        setTaskName(taskName);
    }

    function stopTask() {
        setTimeSpent(Date.now() - startTime - totalPausedDuration);
        setTaskStatus(TaskStatus.notStarted);
        storeTask({ taskName, timeSpent, timestamp: Date.now() });
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
                if (timeSpent < 86340000) { // 23 hours 59 minutes
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
            <TasksGrid
                data={taskList}
                onPress={(taskName: string) => {
                    if (taskStatus === TaskStatus.notStarted) {
                        startTask(taskName);
                    }
                }}
            />
            <View style={styles.timerContainer}>
                <Stopwatch time={msToTime(timeSpent)} style={styles.stopwatch} />
                <TaskStatusButtons
                    style={styles.taskStatusButtons}
                    taskStatus={taskStatus}
                    onPressPause={pauseTask}
                    onPressPlay={playTask}
                    onPressStop={stopTask}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 16,
    },
    timerContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    stopwatch: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        width: 200,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 24,
    },
    taskStatusButtons: {
        marginTop: 16,
    },
});
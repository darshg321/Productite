import {StyleSheet, View} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskStatusButtons, {TaskStatus} from "@/components/timetracker/TaskStatusButtons";
import TimeConfirmationView from "@/components/timetracker/TimeConfirmationView";
import * as SQLite from 'expo-sqlite';
import TasksGrid from "@/components/timetracker/TasksGrid";

async function initDb() {
    const db = await SQLite.openDatabaseAsync('timetracker.db');
    await db.runAsync(
        'CREATE TABLE IF NOT EXISTS confirmationData (id INTEGER PRIMARY KEY NOT NULL, task TEXT, category TEXT, time TEXT);')
    return db;
}

// TODO remove
async function clearConfirmationData(db) {
    db.runAsync('DROP TABLE IF EXISTS confirmationData;')
        .then(r => console.log(r));
}

async function storeConfirmationData(db, task, category, time) {
    try {
        await db.runAsync(
            'INSERT INTO confirmationData (task, category, time) VALUES (?, ?, ?);',
            [task, category, time]
        );
    } catch (error) {
        console.error("Failed to store confirmation data:", error);
    }
}

async function getConfirmationData(db) {
    return db.getAllAsync('SELECT * FROM confirmationData;');
}

function declineConfirmation() {
    // TODO
    console.log('Declined');
}

function confirmConfirmation() {
    // TODO
    console.log('Confirmed');
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

export default function TimeTracker() {
    const [taskName, setTaskName] = useState("");
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [totalPausedDuration, setTotalPausedDuration] = useState(0);
    const [taskStatus, setTaskStatus] = useState(TaskStatus.notStarted);
    const [confirmationData, setConfirmationData] = useState([]);
    const [db, setDb] = useState(null);

    useEffect(() => {
        initDb().then(db => {
            setDb(db)
            getConfirmationData(db).then(data => setConfirmationData(data));
        });
    }, []);

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
        storeConfirmationData(db, taskName, "Category 1", msToTime(time)) // FIXME add category
        getConfirmationData(db).then(data => setConfirmationData(data));
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
            {/*<TextInput style={styles.input} placeholder={"Name of Task"} onChangeText={setTaskName}/>*/}
            <TaskStatusButtons taskStatus={taskStatus} onPressPause={pauseTask} onPressPlay={playTask}
                               onPressStop={stopTask}/>
            <TimeConfirmationView data={confirmationData} onConfirm={confirmConfirmation}
                                  onDecline={declineConfirmation}/>
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


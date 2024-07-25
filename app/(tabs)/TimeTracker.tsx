import {StyleSheet, View} from "react-native";
import {Stopwatch} from "@/components/timetracker/Stopwatch";
import {useEffect, useState} from "react";
import TaskStatusButtons, {TaskStatus} from "@/components/timetracker/TaskStatusButtons";
import TimeConfirmationView from "@/components/timetracker/TimeConfirmationView";
import * as SQLite from 'expo-sqlite';
import TasksGrid from "@/components/timetracker/TasksGrid";

const db = SQLite.openDatabaseSync('timetracker.db');
db.runAsync(
    'CREATE TABLE IF NOT EXISTS confirmationData (id INTEGER PRIMARY KEY NOT NULL, task TEXT, category TEXT, time TEXT);')

// Initialize the queue with a resolved promise
const createDbOperationQueue = () => {
    let queue = Promise.resolve();

    return (operation) => {
        queue = queue.then(() => operation().catch(err => console.error(err)));
        return queue;
    };
};

// Create a queue instance for database operations
const dbQueue = createDbOperationQueue();

// Enqueue operations
dbQueue(() => clearConfirmationData());
dbQueue(() => storeConfirmationData('Task', 'Category', 'Time'));

// TODO remove
async function clearConfirmationData() {
    db.runAsync('DROP TABLE IF EXISTS confirmationData;')
        .then(r => console.log(r));
}

async function storeConfirmationData(task, category, time) {
    try {
        await db.runAsync(
            'INSERT INTO confirmationData (task, category, time) VALUES (?, ?, ?);',
            [task, category, time]
        );
    } catch (error) {
        console.error("Failed to store confirmation data:", error);
    }
}

async function getConfirmationData() {
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

    useEffect(() => {
        // getConfirmationData().then(data => setConfirmationData(data));
        dbQueue(() => getConfirmationData()).then(data => setConfirmationData(data));
        console.log("init data")
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
        dbQueue(() => storeConfirmationData(taskName, "Category 1", msToTime(time))) // FIXME add category
        dbQueue(() => getConfirmationData().then(data => setConfirmationData(data)));
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
                    console.log(r)
                    if (taskStatus == TaskStatus.notStarted) {
                        startTask(r)
                    }}}>
            </TasksGrid>
            <Stopwatch time={msToTime(time)}></Stopwatch>
            {/*<TextInput style={styles.input} placeholder={"Name of Task"} onChangeText={setTaskName}/>*/}
            <TaskStatusButtons taskStatus={taskStatus} onPressStart={startTask} onPressPause={pauseTask} onPressPlay={playTask}
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


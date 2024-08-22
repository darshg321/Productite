import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import {Asset} from "expo-asset";
import {PastTaskData, TaskItem} from "@/src/types";

async function initDb() {
    const internalDbName = "Productite.sqlite";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        const asset = Asset.fromModule(require("@/assets/Productite.db"));
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    return await SQLite.openDatabaseAsync(internalDbName);
}

export async function clearPastTasks() {
    const db = await initDb();
    db.runAsync('DELETE FROM pastTasks;')
        .then(r => console.log(r));
}

export async function deleteDb() {
    const internalDbName = "Productite.sqlite";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if ((await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.deleteAsync(sqlDir + internalDbName);
    }
}

export async function storeTask({taskName, timeSpent, timestamp}: PastTaskData) {
    const db = await initDb();
    try {
        await db.runAsync(
            'INSERT INTO pastTasks (taskName, timeSpent, timestamp) VALUES (?, ?, ?);',
            [taskName, timeSpent, timestamp]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function storeNewTaskItem({taskName, category, icon}: TaskItem) {
    const db = await initDb();
    try {
        await db.runAsync(
            'INSERT INTO taskList (taskName, category, icon) VALUES (?, ?, ?);',
            [taskName, category, icon]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function deleteTaskFromTaskList(taskName: string) {
    const db = await initDb();
    return db.runAsync(`DELETE FROM taskList WHERE taskName = ?;`, [taskName]);
}

export async function getPastTasks() {
    const db = await initDb();
    return db.getAllAsync('SELECT * FROM pastTasks;');
}

export async function getTaskInfo(taskName: string): Promise<TaskItem> {
    const db = await initDb();
    const r: TaskItem | null = await db.getFirstAsync(`SELECT * FROM taskList WHERE taskName = ?;`, [taskName]);
    return r ? r : {taskName: "", category: null, icon: ""} as TaskItem;
}

export async function getTaskList() {
    const db = await initDb();
    return db.getAllAsync('SELECT * FROM taskList;');
}

export async function getCategories() {
    const db = await initDb();
    return db.getAllAsync('SELECT * FROM categories;');
}

export async function getTaskTimeSum() {
    const db = await initDb();
    return db.getAllAsync(`SELECT taskName, SUM(timeSpent) as timeSpent FROM pastTasks GROUP BY taskName;`);
}
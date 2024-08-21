import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import {Asset} from "expo-asset";

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

export async function storeTask(task: string, timeSpent: number, timestamp: number) {
    const db = await initDb();
    try {
        await db.runAsync(
            'INSERT INTO pastTasks (task, timeSpent, timestamp) VALUES (?, ?, ?);',
            [task, timeSpent, timestamp]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function storeNewTaskItem(task: string, category: string | null, icon: string) {
    const db = await initDb();
    try {
        await db.runAsync(
            'INSERT INTO taskList (task, category, icon) VALUES (?, ?, ?);', // change to taskList
            [task, category, icon]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function deleteTaskFromTaskList(taskName: string) {
    const db = await initDb();
    return db.runAsync(`DELETE FROM taskList WHERE task = ${taskName};`);
}

export async function getPastTasks() {
    const db = await initDb();
    return db.getAllAsync('SELECT * FROM pastTasks;');
}

export async function getTaskInfo(taskName: string) {
    const db = await initDb();
    return db.getAllAsync(`SELECT * FROM taskList WHERE task = ${taskName};`);
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
    return db.getAllAsync(`SELECT task, SUM(timeSpent) as timeSpent FROM pastTasks GROUP BY task;`);
}
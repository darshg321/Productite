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

    const db= await SQLite.openDatabaseAsync(internalDbName);
    return db;
}

// async function initDb() {
//     const db = await SQLite.openDatabaseAsync('@/assets/Productite.db');
//     // await db.runAsync(
//     //     'CREATE TABLE IF NOT EXISTS pastTasks (id INTEGER PRIMARY KEY NOT NULL, task TEXT, category TEXT, time TEXT);')
//     return db;
// }

export async function clearPastTasks() {
    const db = await initDb();
    db.runAsync('DELETE FROM pastTasks;')
        .then(r => console.log(r));
}

export async function deleteDb() {
    const db = await initDb();
    db.runAsync('DELETE FROM tasks;')
        .then(r => console.log(r));
}

export async function storeTask(task, category, time) {
    const db = await initDb();
    try {
        await db.runAsync(
            'INSERT INTO pastTasks (task, category, time) VALUES (?, ?, ?);',
            [task, category, time]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function getPastTasks() {
    const db = await initDb();
    return db.getAllAsync('SELECT * FROM pastTasks;');
}

export async function runCustomGetAll(operation) {
    const db = await initDb();
    return db.getAllAsync(operation);
}
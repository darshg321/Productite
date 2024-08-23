import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { Asset } from "expo-asset";
import { PastTaskData, TaskItem } from "@/src/types";

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
    console.log("clearPastTasks");
    try {
        await db.withTransactionAsync(async () => {
            await db.execAsync('DELETE FROM pastTasks;');
        });
    } catch (error) {
        console.error("Failed to clear past tasks:", error);
    }
}

export async function deleteDb() {
    const internalDbName = "Productite.sqlite";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if ((await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.deleteAsync(sqlDir + internalDbName);
    }
}

export async function storeTask({ taskName, timeSpent, timestamp }: PastTaskData) {
    const db = await initDb();
    console.log("storeTask");
    try {
        db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `INSERT INTO pastTasks (taskName, timeSpent, timestamp) VALUES ($taskName, $timeSpent, $timestamp);`)
            await statement.executeAsync({$taskName: taskName, $timeSpent: timeSpent, $timestamp: timestamp});
            await statement.finalizeAsync();
            // await db.execAsync(
            //     'INSERT INTO pastTasks (taskName, timeSpent, timestamp) VALUES (?, ?, ?);',
            //     [taskName, timeSpent, timestamp]
            // );
        });
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function storeNewTaskItem({ taskName, category, icon }: TaskItem) {
    const db = await initDb();
    console.log("storeTaskItem");
    try {
        db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `INSERT INTO taskList (taskName, category, icon) VALUES ($taskName, $category, $icon);`)
            await statement.executeAsync({$taskName: taskName, $category: category, $icon: icon});
            await statement.finalizeAsync();
        });
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function deleteTaskFromTaskList(taskName: string) {
    const db = await initDb();
    console.log("delTask");
    try {
        db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `DELETE FROM taskList WHERE taskName = $taskName;`)
            await statement.executeAsync({$taskName: taskName});
            await statement.finalizeAsync();
            // await db.execAsync('DELETE FROM taskList WHERE taskName = ?;', [taskName]);
        });
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
}

export async function getPastTasks(): Promise<PastTaskData[]> {
    const db = await initDb();
    console.log("getPastTasks");
    try {
        db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `SELECT * FROM pastTasks;`)
            await statement.executeAsync();
            await statement.finalizeAsync();
        });
        // return await db.getAllAsync('SELECT * FROM pastTasks;');
    } catch (error) {
        console.error("Failed to get past tasks:", error);
        return [];
    }
}

export async function getTaskInfo(taskName: string): Promise<TaskItem> {
    const db = await initDb();
    console.log("getTaskInfo");
    try {
        await db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `SELECT * FROM taskList WHERE taskName = $taskName;`)
            await statement.executeAsync({$taskName: taskName});
            await statement.finalizeAsync();
        });
        // const r = await db.getFirstAsync('SELECT * FROM taskList WHERE taskName = ?;', [taskName]);
        // return r ? r : { taskName: "", category: null, icon: "" } as TaskItem;
    } catch (error) {
        console.error("Failed to get task info:", error);
        return { taskName: "", category: null, icon: "" } as TaskItem;
    }
}

export async function getTaskList(): Promise<TaskItem[]> {
    const db = await initDb();
    console.log("getTaskList");
    try {
        await db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `SELECT * FROM taskList;`)
            await statement.executeAsync();
            await statement.finalizeAsync();
        });
        // return await db.getAllAsync('SELECT * FROM taskList;');
    } catch (error) {
        console.error("Failed to get task list:", error);
        return [];
    }
}

export async function getCategories(): Promise<{ category: string }[]> {
    const db = await initDb();
    console.log("getCategories");
    try {
        await db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `SELECT * FROM categories;`)
            await statement.executeAsync();
            await statement.finalizeAsync();
        });
        // return await db.getAllAsync('SELECT * FROM categories;');
    } catch (error) {
        console.error("Failed to get categories:", error);
        return [];
    }
}

export async function getTaskTimeSum(): Promise<{ taskName: string, timeSpent: number }[]> {
    const db = await initDb();
    console.log("getTaskTimeSum");
    try {
        await db.withTransactionAsync(async () => {
            const statement = await db.prepareAsync(
                `SELECT taskName, SUM(timeSpent) as timeSpent FROM pastTasks GROUP BY taskName;`)
            await statement.executeAsync();
            await statement.finalizeAsync();
        });
        // return await db.getAllAsync('SELECT taskName, SUM(timeSpent) as timeSpent FROM pastTasks GROUP BY taskName;');
    } catch (error) {
        console.error("Failed to get task time sum:", error);
        return [];
    }
}
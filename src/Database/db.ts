import * as SQLite from "expo-sqlite/legacy";
import * as FileSystem from 'expo-file-system';
import { Asset } from "expo-asset";
import { PastTaskData, TaskItem } from "@/src/types";

const DB_NAME = "Productite.sqlite";
const SQL_DIR = FileSystem.documentDirectory + "SQLite/";

let db: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
    if (db !== null) {
        return db;
    }

    const dbPath = SQL_DIR + DB_NAME;
    try {
        const { exists } = await FileSystem.getInfoAsync(dbPath);
        if (!exists) {
            await FileSystem.makeDirectoryAsync(SQL_DIR, { intermediates: true });
            const asset = Asset.fromModule(require("@/assets/Productite.db"));
            await FileSystem.downloadAsync(asset.uri, dbPath);
        }

        db = SQLite.openDatabase(DB_NAME);
        return db;
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw new Error("Database initialization failed");
    }
}

async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
    try {
        const database = await getDb();
        return new Promise((resolve, reject) => {
            database.transaction(tx => {
                tx.executeSql(
                    query,
                    params,
                    (_, result) => resolve(result.rows._array as T),
                    (_, error) => {
                        console.error(`Query failed: ${query}`, error);
                        reject(error);
                        return false;
                    }
                );
            }, (error) => {
                console.error("Transaction error:", error);
                reject(error);
            });
        });
    } catch (error) {
        console.error("Failed to execute query:", error);
        throw error;
    }
}

export async function clearPastTasks(): Promise<void> {
    try {
        await executeQuery('DELETE FROM pastTasks;');
    } catch (error) {
        console.error("Failed to clear past tasks:", error);
    }
}

export async function deleteDb(): Promise<void> {
    try {
        const dbPath = SQL_DIR + DB_NAME;
        const { exists } = await FileSystem.getInfoAsync(dbPath);
        if (exists) {
            await FileSystem.deleteAsync(dbPath);
        }
        db = null; // Reset the database connection
    } catch (error) {
        console.error("Failed to delete database:", error);
    }
}

export async function storeTask(task: PastTaskData): Promise<void> {
    try {
        const { taskName, timeSpent, timestamp } = task;
        await executeQuery(
            'INSERT INTO pastTasks (taskName, timeSpent, timestamp) VALUES (?, ?, ?);',
            [taskName, timeSpent, timestamp]
        );
    } catch (error) {
        console.error("Failed to store task:", error);
    }
}

export async function storeNewTaskItem(task: TaskItem): Promise<void> {
    try {
        const { taskName, category, icon } = task;
        await executeQuery(
            'INSERT INTO taskList (taskName, category, icon) VALUES (?, ?, ?);',
            [taskName, category, icon]
        );
    } catch (error) {
        console.error("Failed to store new task item:", error);
    }
}

export async function deleteTaskFromTaskList(taskName: string): Promise<void> {
    try {
        await executeQuery('DELETE FROM taskList WHERE taskName = ?;', [taskName]);
    } catch (error) {
        console.error("Failed to delete task from task list:", error);
    }
}

export async function getPastTasks(): Promise<PastTaskData[]> {
    try {
        return await executeQuery<PastTaskData[]>('SELECT * FROM pastTasks;');
    } catch (error) {
        console.error("Failed to get past tasks:", error);
        return [];
    }
}

export async function getTaskInfo(taskName: string): Promise<TaskItem> {
    try {
        const result = await executeQuery<TaskItem[]>(
            'SELECT * FROM taskList WHERE taskName = ?;',
            [taskName]
        );
        return result[0] || { taskName: "", category: null, icon: "" };
    } catch (error) {
        console.error("Failed to get task info:", error);
        return { taskName: "", category: null, icon: "" };
    }
}

export async function getTaskList(): Promise<TaskItem[]> {
    try {
        return await executeQuery<TaskItem[]>('SELECT * FROM taskList;');
    } catch (error) {
        console.error("Failed to get task list:", error);
        return [];
    }
}

export async function getCategories(): Promise<{ category: string }[]> {
    try {
        return await executeQuery<{ category: string }[]>('SELECT * FROM categories;');
    } catch (error) {
        console.error("Failed to get categories:", error);
        return [];
    }
}

export async function getTaskTimeSum(): Promise<{ taskName: string, timeSpent: number }[]> {
    try {
        return await executeQuery<{ taskName: string, timeSpent: number }[]>(
            'SELECT taskName, SUM(timeSpent) as timeSpent FROM pastTasks GROUP BY taskName;'
        );
    } catch (error) {
        console.error("Failed to get task time sum:", error);
        return [];
    }
}
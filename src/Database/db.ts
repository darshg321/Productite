import * as SQLite from "expo-sqlite";

async function initDb() {
    const db = await SQLite.openDatabaseAsync('Productite.db');
    await db.runAsync(
        'CREATE TABLE IF NOT EXISTS pastTasks (id INTEGER PRIMARY KEY NOT NULL, task TEXT, category TEXT, time TEXT);')
    return db;
}

export async function clearPastTasks() {
    const db = await initDb();
    db.runAsync('DROP TABLE IF EXISTS pastTasks;')
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
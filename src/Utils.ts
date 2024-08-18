import {runCustomGetAll} from "@/src/Database/db";


export function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60),
        minutes = parseInt((duration/(1000*60))%60),
        hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export function loadIcons() {
    let taskIcons = {};
    runCustomGetAll('SELECT * FROM tasks;').then(r => {
        // r.map((item, index) => {taskIcons.push({item.task: require(`@/assets/taskicons/${item.icon}`)}})
        for (let i = 0; i < r.length; i++) {
            taskIcons[r[i].task] = `require(@/assets/taskicons/${r[i].icon}`;
        }
    })
    return taskIcons;
}
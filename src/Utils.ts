
export function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60),
        minutes = parseInt((duration/(1000*60))%60),
        hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

export const icons = {
    archery: require('@/assets/images/taskicons/archery.png'),
    basketball: require('@/assets/images/taskicons/basketball.png'),
    coding: require('@/assets/images/taskicons/coding.png'),
    cooking: require('@/assets/images/taskicons/cooking.png'),
    cubing: require('@/assets/images/taskicons/cubing.png'),
    default: require('@/assets/images/taskicons/default.png'),
    eating: require('@/assets/images/taskicons/eating.png'),
    science: require('@/assets/images/taskicons/science.png'),
    showering: require('@/assets/images/taskicons/showering.png'),
    sleeping: require('@/assets/images/taskicons/sleeping.png'),
}
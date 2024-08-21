
export type TaskItem = {
    id: number,
    taskName: string,
    category: string | null,
    icon: string,
};

export type PastTaskData = {
    id?: number,
    taskName: string,
    timeSpent: number,
    timestamp?: number,
};

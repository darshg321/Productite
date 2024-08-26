import { FlatList, StyleSheet, View } from "react-native";
import PastTaskBox from "@/components/timetracker/PastTaskBox";
import {PastTaskData, TaskItem} from "@/src/types";
import {useEffect, useState} from "react";
import {getTaskInfo} from "@/src/Database/db";

export default function PastTasksView(props: { data: PastTaskData[] }) {
    const [taskInfoDict, setTaskInfoDict] = useState<{ [key: string]: TaskItem }>({});

    useEffect(() => {
        props.data.forEach(async (task) => {
            const taskInfo = await getTaskInfo(task.taskName);
            setTaskInfoDict((prev) => ({ ...prev, [task.taskName]: taskInfo }));
        });
    }, [props.data]);

    function renderItem({ item }: { item: PastTaskData }) {
        const taskInfo = taskInfoDict[item.taskName];
        return (
            <PastTaskBox
                taskData={item}
                taskInfo={taskInfo}
            />
        );
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={props.data}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        padding: 20,
    },
});
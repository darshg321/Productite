import { FlatList, StyleSheet, View } from "react-native";
import PastTaskBox from "@/components/timetracker/PastTaskBox";
import {PastTaskData} from "@/src/types";

export default function PastTasksView(props: { data: PastTaskData[] }) {
    function renderItem({ item }: { item: PastTaskData }) {
        return (
            <PastTaskBox taskName={item.taskName} timeSpent={item.timeSpent} />
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
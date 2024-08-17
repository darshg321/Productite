import { FlatList, StyleSheet, View } from "react-native";
import EditTaskBox from "@/components/timetracker/EditTasksBox";
import { msToTime } from "@/src/Utils";

export default function PastTasksView(props) {
    function renderItem({ item }) {
        return (
            // <PastTaskBox task={item.task} category={item.category} time={msToTime(item.time)} />
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
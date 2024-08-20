import { FlatList, StyleSheet, View } from "react-native";
import EditTaskBox from "@/components/timetracker/EditTasksBox";

export default function PastTasksView(props) {
    function renderItem({ item }) {
        return (
            <EditTaskBox task={item.task} category={item.category} icon={item.icon} />
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
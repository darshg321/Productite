import {Text, View, StyleSheet} from "react-native";
import {PastTaskData} from "@/src/types";
import {msToTime} from "@/src/Utils";

export default function PastTaskBox(props: PastTaskData) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.taskText}>{props.taskName}</Text>
                <Text style={styles.timestamp}>{props.timestamp}</Text>
            </View>
            <Text style={styles.timeText}>{msToTime(props.timeSpent)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textContainer: {
        flexDirection: 'column',
    },
    taskText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    timestamp: {
        fontSize: 14,
        color: '#666',
    },
    timeText: {
        fontSize: 14,
        color: '#333',
    },
});
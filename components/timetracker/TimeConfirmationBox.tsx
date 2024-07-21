import {Text, View, StyleSheet} from "react-native";


export default function TimeConfirmationBox(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.taskText}>{props.task}</Text>
            <Text style={styles.category}>{props.category}</Text>
            <Text style={styles.timeText}>{props.time}</Text>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        height: 50,
    },
    taskText: {
        marginRight: 10,
        fontSize: 12,
        color: 'black',
    },
    category: {
        marginRight: 10,
        fontSize: 12,
        color: 'black',
    },
    timeText: {
        marginRight: 10,
        fontSize: 12,
        color: 'black',
    }
})
import { View, StyleSheet, Image, Text } from "react-native";
import {icons} from "@/src/Utils";
import {TaskItem} from "@/src/types";

export default function TaskListBox(props: TaskItem) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icons[props.icon as keyof typeof icons]} />
            <View style={styles.textContainer}>
                <Text style={styles.taskName}>{props.taskName}</Text>
                <Text style={styles.category}>{props.category || "Uncategorized"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flex: 1,
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    taskName: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    category: {
        color: '#000',
        fontSize: 14,
    },
});
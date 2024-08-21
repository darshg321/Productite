import { View, StyleSheet, Image, Text } from "react-native";
import {icons} from "@/src/Utils";
import {TaskItem} from "@/src/types";

export default function TaskListBox(props: TaskItem) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icons[props.icon as keyof typeof icons]}></Image>
            <Text>{props.taskName}</Text>
            <Text>{props.category || "Uncategorized"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        margin: 5,
    },
    icon: {
        width: 30,
        height: 30,
        // resizeMode: 'contain',
    }
})
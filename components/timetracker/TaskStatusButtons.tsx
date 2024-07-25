import {AntDesign, Feather} from "@expo/vector-icons";
import {View, StyleSheet} from "react-native";

export enum TaskStatus {
    notStarted,
    running,
    paused
}

export default function TaskStatusButtons(props) {
    if (props.taskStatus === TaskStatus.running) {
        return (
            <View style={styles.container}>
                <AntDesign name="pausecircleo" size={24} color="black" onPress={props.onPressPause} />
                <Feather name="stop-circle" size={24} color="black" onPress={props.onPressStop} />
            </View>
        )
    } else if (props.taskStatus === TaskStatus.paused) {
        return (
            <View style={styles.container}>
                <AntDesign name="playcircleo" size={24} color="black" onPress={props.onPressPlay} />
                <Feather name="stop-circle" size={24} color="black" onPress={props.onPressStop} />
            </View>
        )
    } else if (props.taskStatus === TaskStatus.notStarted) {
        return (
            <View style={styles.container}>
                <AntDesign name={"pluscircleo"} size={24} color="black" onPress={props.onPressStart} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    }
})
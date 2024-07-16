import {AntDesign, Feather} from "@expo/vector-icons";
import {View} from "react-native";

export enum TaskStatus {
    notStarted,
    running,
    paused,
    finished
}

export default function TaskButton(props) {
    if (props.taskStatus === TaskStatus.running) {
        return (
            <View>
                <AntDesign name="pausecircleo" size={24} color="black" onPress={props.onPressPause} />
                <Feather name="stop-circle" size={24} color="black" onPress={props.onPressStop} />
            </View>
        )
    } else if (props.taskStatus === TaskStatus.paused) {
        return (
            <View>
                <AntDesign name="playcircleo" size={24} color="black" onPress={props.onPressPlay} />
                <Feather name="stop-circle" size={24} color="black" onPress={props.onPressStop} />
            </View>
        )
    } else if (props.taskStatus === TaskStatus.finished || props.taskStatus === TaskStatus.notStarted) {
        return (
            <View>
                <AntDesign name={"pluscircleo"} size={24} color="black" onPress={props.onPressStart} />
            </View>
        )
    }
}
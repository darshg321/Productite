import {View, StyleSheet, Image, Text} from "react-native";

export default function TasksButton(props) {
    return (
        <View>
            <Image source={props.icon}/>
            <Text>{props.taskName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})
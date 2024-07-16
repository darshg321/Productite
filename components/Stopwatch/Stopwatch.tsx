import {View, Text, StyleSheet} from "react-native";
import {useState} from "react";


export function Stopwatch(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{props.time}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: "auto",
        height: 50,
    },
    timeText: {
        fontSize: 24,
        color: 'black',
    }
})
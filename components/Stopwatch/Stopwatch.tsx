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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 24,
        color: 'black',
    }
})
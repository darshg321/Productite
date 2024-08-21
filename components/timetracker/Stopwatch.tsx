import {View, Text, StyleSheet, ViewStyle} from "react-native";

export function Stopwatch(props: {time: string, style?: ViewStyle}) {
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
import {View, StyleSheet, Image, Text} from "react-native";

export default function TasksButton(props) {
    return (
        <View style={styles.container}>
            <Image source={props.icon} style={styles.items} />
            <Text style={styles.items}>{props.taskName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    items: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
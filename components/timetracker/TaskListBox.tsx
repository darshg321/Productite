import { View, StyleSheet, Image, Text } from "react-native";
import {icons} from "@/src/Utils";

export default function TaskListBox(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icons[props.icon]}></Image>
            <Text>{props.task}</Text>
            <Text>{props.category || "Uncategorized"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        margin: 5,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    }
})
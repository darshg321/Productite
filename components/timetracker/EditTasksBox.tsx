import { View, StyleSheet, Image, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {icons} from "@/src/Utils";

export default function EditTasksBox(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icons[props.icon]}></Image>
            <Text>{props.task}</Text>
            <Text>{props.category || "Uncategorized"}</Text>
            <Entypo name="dots-three-vertical" size={24} color="black" />
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
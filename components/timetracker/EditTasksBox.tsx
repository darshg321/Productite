import { View, StyleSheet, Image, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';


export default function EditTasksBox(props) {
    return (
        <View style={styles.container}>
            <Image source={props.icon}></Image>
            <Text>{props.task}</Text>
            <Text>{props.category}</Text>
            <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})
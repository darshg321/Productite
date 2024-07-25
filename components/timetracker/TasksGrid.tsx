import {View, StyleSheet, Image, Text, ScrollView, Pressable} from "react-native";

export default function TasksGrid(props) {
    return (
        <ScrollView contentContainerStyle={styles.grid}>
            {props.data.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Pressable onPress={() => props.onPress(item.taskName)}>
                        <View>
                            <Image source={item.icon} style={styles.icon}/>
                            <Text style={styles.text}>{item.taskName}</Text>
                        </View>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: '#D3D3D3',
    },
    item: {
        width: '20%', // Adjust based on how many items per row you want
        aspectRatio: 1, // Keeps the item as a square
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    icon: {
        width: '100%',
        height: '70%', // Adjust based on the space needed for text
        resizeMode: 'contain',
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },
});
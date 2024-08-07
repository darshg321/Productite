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
        backgroundColor: '#f0f0f0',
    },
    item: {
        width: '30%',
        aspectRatio: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 5,
    },
    icon: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        color: '#333',
    },
});
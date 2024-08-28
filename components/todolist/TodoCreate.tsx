import React from "react";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TodoCreate(props: { value: string; onChangeText: (text: string) => void; onCreateTask: () => void }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={'Create new Todo'}
                enterKeyHint={'done'}
                onKeyPress={e => {e.nativeEvent.key === 'Enter' && props.onCreateTask();}}
            />
            <Pressable style={styles.addButton} onPress={props.onCreateTask}>
                <AntDesign name="pluscircle" size={56} color="#007AFF" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        fontSize: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#F2F2F7',
    },
    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
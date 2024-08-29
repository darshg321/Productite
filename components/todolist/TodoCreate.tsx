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
                placeholder={'Add reminder'}
                placeholderTextColor="#8E8E93"
                enterKeyHint={'done'}
                onKeyPress={e => {e.nativeEvent.key === 'Enter' && props.onCreateTask();}}
            />
            <Pressable style={styles.addButton} onPress={props.onCreateTask}>
                <AntDesign name="plus" size={24} color="#FFFFFF" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 12,
        padding: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        padding: 12,
    },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import React from "react";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TodoCreate(props: { value: string; onChangeText: (text: string) => void; onCreateTask: () => void }) {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholder={'Add reminder'}
                    placeholderTextColor="#8E8E93"
                    enterKeyHint={'done'}
                    onKeyPress={e => {e.nativeEvent.key === 'Enter' && props.onCreateTask();}}
                />
            </View>
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
        backgroundColor: '#F2F2F7',
        padding: 16,
        paddingBottom: 24,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        fontSize: 16,
        color: '#000000',
        padding: 12,
    },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
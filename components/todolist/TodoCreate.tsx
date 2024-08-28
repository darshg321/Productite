import {Pressable, TextInput, View, StyleSheet, GestureResponderEvent} from "react-native";
import {router} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import React from "react";


export default function TodoCreate(props: { value: string, onChangeText: ((text: string) => void), onCreateTask: () => void }) {
    return (
        <View>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={'Create new Todo'}
                enterKeyHint={'done'}
                onKeyPress={e => {e.nativeEvent.key === 'Enter' && props.onCreateTask;}}
            />
            <Pressable style={styles.addButton} onPress={props.onCreateTask}>
                <AntDesign name="pluscircle" size={56} color="#007AFF" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 5,
    },
});
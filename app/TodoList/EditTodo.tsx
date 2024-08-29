import { useEffect, useState } from "react";
import {router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import {TextInput, View, StyleSheet, Button} from "react-native";
import TimePicker from "@/components/todolist/TimePicker";
import {getTodoItemInfo, storeTodoItem, updateTodoItem} from "@/src/Database/db";
import AntDesign from "@expo/vector-icons/AntDesign";
import {readableTime} from "@/src/Utils";

export default function EditTodo() {
    const [todoName, setTodoName] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [dueTime, setDueTime] = useState<Date | null>(null);
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const params = useGlobalSearchParams();

    useEffect(() => {
        if (params.todoName) {
            setTodoName(params.todoName as string);
            getTodoItemInfo(params.todoName as string).then(r => {
                    setDueDate(new Date(r.dueTime as number));
                    setDueTime(new Date(r.dueTime as number));
            });
        }
    }, []);

    function getFullDueTime(): Date | null {
        if (dueDate && dueTime) {
            return new Date(
                dueDate.getFullYear(),
                dueDate.getMonth(),
                dueDate.getDate(),
                dueTime.getHours(),
                dueTime.getMinutes(),
                dueTime.getSeconds(),
            );
        }
        return null;
    }

    function storeItem() {
        const fullDueTime = getFullDueTime();
        if (!todoName.trim()) {
            alert('Please enter a todo name');
        } else if (fullDueTime && fullDueTime < new Date()) {
            alert('Due time has to be in the future');
        } else {
            if (params.todoName) {
                updateTodoItem({
                    todoName: params.todoName as string,
                    dueTime: fullDueTime ? fullDueTime.getTime() : null,
                    isCompleted: false
                });
            } else {
                storeTodoItem({
                    todoName: todoName.trim(),
                    dueTime: fullDueTime ? fullDueTime.getTime() : null,
                    isCompleted: false
                });
            }
            // router.setParams({todoName: ''}); // to refresh the TodoList
            router.push('/TodoList');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={todoName}
                onChangeText={setTodoName}
                placeholder={'Edit Todo'}
            />
            <View style={styles.timeContainer}>
                <Button title={getFullDueTime() ? readableTime(getFullDueTime()) : "Set Due Time"} onPress={() => setDatePickerVisible(true)}/>
                {datePickerVisible && <AntDesign name={'closecircleo'} size={24} color={'#007AFF'} onPress={() => {
                    setDatePickerVisible(false)
                    setDueDate(null)
                    setDueTime(null)
                }}/>}
            </View>
            {datePickerVisible && <TimePicker show={datePickerVisible} onChangeDate={setDueDate} onChangeTime={setDueTime} initialTime={dueTime} initialDate={dueDate}/>}
            <Button title={'Cancel'} onPress={() => router.push('/TodoList')}/>
            <Button title={'Save'} onPress={storeItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 16,
    },
    input: {
        fontSize: 16,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    timeContainer: {
        marginTop: 16,
    },
    timeButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    timeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
});
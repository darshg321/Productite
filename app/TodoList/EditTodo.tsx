import {useEffect, useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {Pressable, Text, TextInput, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditTodo() {
//     try adding header here maybe
    const [todoName, setTodoName] = useState<string>('');
    const [dueTime, setDueTime] = useState<Date>(new Date(Date.now()));
    const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now())); //FIXME maybe not needed
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const params = useLocalSearchParams()

    useEffect(() => {
        params.todoName && setTodoName(params.todoName as string)
    }, []);

    return (
        <View>
            <TextInput
                value={todoName}
                onChangeText={setTodoName}
                placeholder={'Create new Todo'}
            />
            <View>
                <Pressable onPress={() => setDatePickerVisible(true)}>
                    <Text>Time</Text>
                </Pressable>
            </View>
            {datePickerVisible && <DateTimePicker
                value={dueTime}
                mode={'datetime'}
                display={'default'}
                onChange={(e, selectedDate) => {
                    setDueTime(selectedDate || dueTime)
                }}
                minimumDate={currentDate}
            />}
        </View>
    )
}
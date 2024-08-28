import { Modal, Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimePickerParams {
    show: boolean;
}

export default function TimePicker(props: TimePickerParams) {
    const [date, setDate] = useState<Date>(new Date(Date.now()));
    const [time, setTime] = useState<Date>(new Date(Date.now()));
    const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now()));
    const [currentTime, setCurrentTime] = useState<Date>(new Date(Date.now()));
    const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

    return (
        <Modal animationType={'none'} visible={props.show}>
            <View style={styles.container}>
                <View style={styles.dateTimeContainer}>
                    <Pressable onPress={() => {
                        setShowTimePicker(false);
                        setShowDatePicker(true);
                    }}>
                        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
                    </Pressable>
                    <Text style={styles.text}> | </Text>
                    <Pressable onPress={() => {
                        setShowTimePicker(true);
                        setShowDatePicker(false);
                    }}>
                        <Text style={styles.text}>{time.toLocaleTimeString()}</Text>
                    </Pressable>
                </View>

                {showDatePicker && <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={'inline'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        setDate(selectedDate || date);
                    }}
                    minimumDate={currentDate}
                />}

                {showTimePicker && <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={'inline'}
                    onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        setTime(selectedTime || time);
                    }}
                    minimumDate={currentTime}
                />}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
});
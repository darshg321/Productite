import {View, StyleSheet, Text} from "react-native";
import {PieChart} from "react-native-gifted-charts";
import {useState} from "react";
import {getTaskTimeSum} from "@/src/Database/db";
import {PastTaskData} from "@/src/types";

function pastTaskDataToChartData(pastTaskData: PastTaskData[]) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
    ];
    return pastTaskData.map((task, index) => {
        return {
            text: task.taskName,
            value: task.timeSpent,
            color: colors[index % colors.length]
        }
    });
}
export function TasksPieChart() {
    const [pastTaskData, setPastTaskData]
        = useState<PastTaskData[]>([]);

    // FIXME bad performance
    getTaskTimeSum().then(r => setPastTaskData(r as PastTaskData[]))

    return (
        <View style={styles.container}>
            <PieChart
                data={pastTaskDataToChartData(pastTaskData)}
                radius={150}
                textSize={15}
                textColor={'#000'}
                showText={true}
                strokeColor={'#fff'}
                strokeWidth={2}
            />
            <View style={styles.legend}>
                {pastTaskDataToChartData(pastTaskData).map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.colorBox, {backgroundColor: item.color}]} />
                        <Text style={styles.legendText}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    legend: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    colorBox: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    legendText: {
        fontSize: 14,
        color: '#333',
    },
});
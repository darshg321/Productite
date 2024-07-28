import {View} from "react-native";
import {PieChart} from "react-native-gifted-charts";
import {runCustom} from "@/components/Database/db";

function combineTasks() {
    // Combine tasks with the same name
    let combinedTasks = {};
    // console.log("w", runCustom('SELECT task, SUM(time) as time FROM pastTasks GROUP BY task;'))
    runCustom('SELECT task, SUM(time) as time FROM pastTasks GROUP BY task;').then(r => {
        console.log(r)
    })
}

export function TasksPieChart(props) {

    combineTasks()

    return (
        <View>
            {/*<PieChart*/}
            {/*    data={props.data}*/}
            {/*    width={props.width}*/}
            {/*    height={props.height}*/}
            {/*    chartConfig={props.chartConfig}*/}
            {/*    accessor={"value"}*/}
            {/*    backgroundColor={"transparent"}*/}
            {/*    paddingLeft={"15"}*/}
            {/*    absolute={true}*/}
            {/*/>*/}
        </View>
    )
}
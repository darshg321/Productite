import {ScrollView, StyleSheet} from "react-native";
import TasksButton from "@/components/timetracker/TasksButton";

export default function TasksView(props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {props.data.map((item, index) => (
                <TasksButton key={index} taskName={item.taskName} icon={item.icon}/>
            ))}
        </ScrollView>
        )
}

let styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '50%',
        marginTop: 20,
        backgroundColor: "#D3D3D3",
    }
})
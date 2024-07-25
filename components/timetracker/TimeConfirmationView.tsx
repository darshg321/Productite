import {FlatList, ScrollView, StyleSheet} from "react-native";
import TimeConfirmationBox from "@/components/timetracker/TimeConfirmationBox";

export default function TimeConfirmationView(props) {
    function renderItem({item}) {
        return (
            <TimeConfirmationBox task={item.task} category={item.category} time={item.time}
                onConfirm={props.onConfirm} onDecline={props.onDecline}/>
        )
    }

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        //     {props.data.map((item, index) => (
        //         <TimeConfirmationBox key={index} task={item.task} category={item.category} time={item.time}
        //                              onConfirm={props.onConfirm} onDecline={props.onDecline}/>
        //     ))}
        // </ScrollView>
        <FlatList data={props.data} renderItem={renderItem} contentContainerStyle={styles.container}/>
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

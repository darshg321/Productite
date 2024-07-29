import {FlatList, StyleSheet} from "react-native";
import PastTaskBox from "@/components/timetracker/PastTaskBox";
import {msToTime} from "@/src/Utils";

export default function PastTasksView(props) {
    function renderItem({item}) {
        return (
            <PastTaskBox task={item.task} category={item.category} time={msToTime(item.time)}/>
        )
    }
    return (
        <FlatList data={props.data} renderItem={renderItem} contentContainerStyle={styles.container}/>
    )
}
let styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        marginTop: 20,
        backgroundColor: "#D3D3D3",

    }
})

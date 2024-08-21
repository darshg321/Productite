import {FlatList, StyleSheet, Text, View} from "react-native";
import EditTaskBox from "@/components/timetracker/TaskListBox";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {TaskItem} from "@/src/types";

export default function TaskListView(props: { data: TaskItem[],
    onPressEdit: (taskName: string) => void, onPressDelete: (taskName: string) => void}) {

    function renderItem({ item }: { item: TaskItem }) {
        return (
            <View style={styles.itemContainer}>
                <EditTaskBox taskName={item.taskName} category={item.category} icon={item.icon} />
                <Menu>
                    <MenuTrigger>
                        <Entypo name="dots-three-vertical" size={24} color="black"/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => props.onPressEdit(item.taskName)} style={styles.menuOption}>
                            <Feather name="edit" size={24} color="white" />
                            <Text style={styles.menuText}>Edit</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => props.onPressDelete(item.taskName)} style={styles.menuOption}>
                            <AntDesign name="delete" size={24} color="white" />
                            <Text style={styles.menuText}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={props.data}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    container: {
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    menuText: {
        color: '#000',
        marginLeft: 10,
    },
});
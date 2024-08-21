import {FlatList, StyleSheet, Text, View} from "react-native";
import EditTaskBox from "@/components/timetracker/TaskListBox";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

export default function TaskListView(props) {
    function renderItem({ item }) {
        return (
            <View>
                <EditTaskBox task={item.task} category={item.category} icon={item.icon} />
                <Menu>
                    <MenuTrigger>
                        <Entypo name="dots-three-vertical" size={24} color="black"/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => props.onPressEdit(item.task)}>
                            <Feather name="edit" size={24} color="black" />
                            <Text>Edit</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => props.onPressDelete(item.task)}>
                            <AntDesign name="delete" size={24} color="black" />
                            <Text>Delete</Text>
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
        // flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        padding: 20,
    },
});
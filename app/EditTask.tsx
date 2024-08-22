import {Modal, TextInput, View, StyleSheet} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {getCategories, getTaskInfo, storeNewTaskItem} from "@/src/Database/db";
import {router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import IconsView from "@/components/timetracker/IconsView";
import {icons} from "@/src/Utils";
import {TaskItem} from "@/src/types";

export default function EditTask() {
    const params = useGlobalSearchParams<{taskName?: string}>();

    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState<string | null>(null);
    const [icon, setIcon] = useState(icons["defaultIcon"]);
    const [categories, setCategories] = useState<{ id: number, category: string }[]>([]);
    const [iconsViewVisible, setIconsViewVisible] = useState(false);

    if (params.taskName) {
        getTaskInfo(params.taskName as string).then((r: TaskItem) => {
            setTaskName(r.taskName);
            setCategory(r.category);
            setIcon(icons[r.icon as keyof typeof icons]);
        });
    }
    getCategories().then((r) => setCategories(r as { id: number, category: string }[]));

    function storeTaskItem() {
        storeNewTaskItem({taskName, category, icon}).then(() => router.push('/TaskList'));
    }

    function onPressIcon(icon: string) {
        console.log(icon);
        setIcon(icon);
        setIconsViewVisible(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Name of Task"
                onChangeText={setTaskName}
                maxLength={20}
                value={taskName}
            />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
            >
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Picker.Item key={category.id} label={category.category} value={category.category}/>
                    ))
                ) : (
                    <Picker.Item label="Uncategorized" value={null}/>
                )}
            </Picker>
            <View style={styles.iconRow}>
                <AntDesign name="clockcircleo" size={24} color="black" onPress={() => setIconsViewVisible(true)} style={styles.icon}/>
                <AntDesign name="checkcircleo" size={24} color="black" onPress={() => storeTaskItem()} style={styles.icon}/>
                <AntDesign name="closecircleo" size={24} color="black" onPress={() => router.push('/EditTask')} style={styles.icon}/>
            </View>
            <Modal visible={iconsViewVisible}
                   animationType="none"
                   transparent={true}
                   onRequestClose={() => setIconsViewVisible(false)}>
                <View style={styles.modalContainer}>
                    <IconsView onPressIcon={onPressIcon}/>
                    <AntDesign name="closecircleo" size={24} color="black" onPress={() => setIconsViewVisible(false)} style={styles.icon}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    picker: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    icon: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
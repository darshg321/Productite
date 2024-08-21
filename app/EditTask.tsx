import {Modal, TextInput, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {getCategories, getTaskInfo, storeNewTaskItem} from "@/src/Database/db";
import {router, useLocalSearchParams} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import IconsView from "@/components/timetracker/IconsView";
import {icons} from "@/src/Utils";
import {TaskItem} from "@/src/types";


export default function EditTask() {
    const params = useLocalSearchParams();

    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState<string | null>(null);
    const [icon, setIcon] = useState(icons["defaultIcon"]);
    const [categories, setCategories]
            = useState<{ id: number, category: string }[]>([]);
    const [iconsViewVisible, setIconsViewVisible] = useState(false);

    if (params?.taskName) {
        getTaskInfo(params.taskName as string).then((r) => {
            const taskItem = r[0] as TaskItem;
            setTaskName(taskItem.taskName);
            setCategory(taskItem.category);
            setIcon(icons[taskItem.icon as keyof typeof icons]);
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
        <View>
            <TextInput placeholder="Name of Task" onChangeText={setTaskName} maxLength={20} />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Picker.Item key={category.id} label={category.category} value={category.category}/>
                    ))
                ) : (
                    <Picker.Item label="Uncategorized" value={null}/>
                )}
            </Picker>
            <AntDesign name="clockcircleo" size={24} color="black" onPress={() => setIconsViewVisible(true)}/>
            <AntDesign name="checkcircleo" size={24} color="black" onPress={() => storeTaskItem()}/>
            <AntDesign name={"closecircleo"} size={24} color="black" onPress={() => router.push('/EditTask')}/>
            <Modal visible={iconsViewVisible}
                   animationType="none"
                   transparent={true}
                   onRequestClose={() => setIconsViewVisible(false)}>
                <View>
                    <IconsView onPressIcon={onPressIcon}/>
                    <AntDesign name="closecircleo" size={24} color="black" onPress={() => setIconsViewVisible(false)}/>
                </View>
            </Modal>
        </View>
    )
}
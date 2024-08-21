import {Modal, TextInput, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {getCategories, getTaskInfo, storeNewTaskItem, storeTask} from "@/src/Database/db";
import {router, useLocalSearchParams} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import IconsView from "@/components/timetracker/IconsView";
import {icons} from "@/src/Utils";


export default function EditTask() {
    const [taskData, setTaskData] = useState();
    const params = useLocalSearchParams();

    const [taskName, setTaskName] = useState();
    const [category, setCategory] = useState();
    const [icon, setIcon] = useState(icons["default"]);
    const [categories, setCategories] = useState([]);
    const [iconsViewVisible, setIconsViewVisible] = useState(false);

    if (params?.taskName) {
        getTaskInfo(params.taskName).then(data => {
            setTaskData(data);
            setTaskName(data.task || "");
            setCategory(data.category || null);
            setIcon(icons[data.icon || "default"]);
        });
    }

    getCategories().then(data => setCategories(data));

    console.log(icons["default"]);

    function storeTaskItem() {
        storeNewTaskItem(taskName, category, icon).then(() => router.push('/TaskList'));
    }

    function onPressIcon(icon) {
        console.log(icon);
        setIcon(icon);
        setIconsViewVisible(false);
    }


    return (
        <View>
            <TextInput placeholder="Name of Task" onChangeText={setTaskName} maxLength={20} />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
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
                   onRequestClose={() => setIconsViewVisible(false)}
            >
                <View>
                    <IconsView onPressIcon={onPressIcon}/>
                    <AntDesign name="closecircleo" size={24} color="black" onPress={() => setIconsViewVisible(false)}/>
                </View>
            </Modal>
        </View>
    )
}
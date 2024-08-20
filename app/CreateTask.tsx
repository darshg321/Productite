import {Modal, TextInput, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {getCategories, storeTask} from "@/src/Database/db";
import {router} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import IconsView from "@/components/timetracker/IconsView";


export default function CreateTask() {
    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [iconsViewVisible, setIconsViewVisible] = useState(false);
    const [icon, setIcon] = useState();

    function storeNewTaskItem() {

    }

    getCategories().then(data => {
        setCategories(data)
        console.log(categories)
    });

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
            <AntDesign name="checkcircleo" size={24} color="black" onPress={() => storeNewTaskItem()}/>
            <AntDesign name={"closecircleo"} size={24} color="black" onPress={() => router.push('/EditTasks')}/>
            <Modal visible={iconsViewVisible}
                   animationType="slide"
                   transparent={true}
                   onRequestClose={() => setIconsViewVisible(false)}
            >
                <View>
                    <IconsView/>
                    <AntDesign name="closecircleo" size={24} color="black" onPress={() => setIconsViewVisible(false)}/>
                </View>
            </Modal>
        </View>
    )
}
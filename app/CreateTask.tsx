import {TextInput, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {getCategories} from "@/src/Database/db";


export default function CreateTask() {
    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);

    getCategories().then(data => {
        setCategories(data)
        console.log(categories)
    });

    return (
        <View>
            <TextInput placeholder="Task Name" onChangeText={setTaskName}/>
            <Picker>
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                {categories.length > 0 ? (categories.map((category) => {
                    return <Picker.Item key={category.id} label={category.category} value={category.category}/>
                })) : (<Picker.Item label="Uncategorized" value={null}/>)} {/* FIXME, null might not work */}
            </Picker>
        </View>
    )
}
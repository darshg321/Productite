import { Modal, TextInput, View, StyleSheet, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { getCategories, getTaskInfo, storeNewTaskItem } from "@/src/Database/db";
import { router, useGlobalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import IconsView from "@/components/timetracker/IconsView";
import { icons } from "@/src/Utils";
import { TaskItem } from "@/src/types";

export default function EditTask() {
    const params = useGlobalSearchParams<{ taskName?: string }>();

    const [taskName, setTaskName] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);
    const [icon, setIcon] = useState<string>("defaultIcon");
    const [categories, setCategories] = useState<{ category: string }[]>([]);
    const [iconsViewVisible, setIconsViewVisible] = useState<boolean>(false);

    useEffect(() => {
        if (params.taskName) {
            console.log("Getting task info for", params.taskName);
            getTaskInfo(params.taskName as string).then((r: TaskItem) => {
                setTaskName(r.taskName);
                setCategory(r.category);
                setIcon(r.icon);
            });
        }
    }, [params.taskName]);

    getCategories().then((r) => setCategories(r as { category: string }[]));

    function storeTaskItem() {
        storeNewTaskItem({ taskName, category, icon }).then(() => {
            router.setParams({taskName: taskName});
            router.push('/TimeTracker/(tabs)/TaskList')
        });
    }

    function onPressIcon(icon: string) {
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
                        <Picker.Item label={category.category} value={category.category} />
                    ))
                ) : (
                    <Picker.Item label="Uncategorized" value={null} />
                )}
            </Picker>
            <View style={styles.iconRow}>
                <Pressable onPress={() => setIconsViewVisible(true)}>
                    <Image source={icons[icon as keyof typeof icons]} style={{ width: 48, height: 48 }} />
                </Pressable>
                <AntDesign name="checkcircleo" size={24} color="black" onPress={() => storeTaskItem()} style={styles.icon} />
                <AntDesign name="back" size={24} color="black" onPress={() => router.push('/TimeTracker/(tabs)/TaskList')} style={styles.icon} />
            </View>
            <IconsView visible={iconsViewVisible} onPressIcon={onPressIcon} onClose={() => setIconsViewVisible(false)} />
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
});
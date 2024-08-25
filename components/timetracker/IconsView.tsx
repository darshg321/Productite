import { FlatList, View, Image, StyleSheet, Pressable, Modal } from "react-native";
import { icons } from "@/src/Utils";
import { AntDesign } from "@expo/vector-icons";

export default function IconsView(props: { onPressIcon: (icon: string) => any, visible: boolean, onClose: () => void }) {
    function renderItem({ item }: { item: string }) {
        return (
            <Pressable style={styles.iconContainer} onPress={() => {
                props.onPressIcon(item);
            }}>
                <Image style={styles.icon} source={icons[item as keyof typeof icons]} />
            </Pressable>
        );
    }

    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            transparent={true}
            onRequestClose={props.onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <AntDesign name="close" size={24} color="black" onPress={props.onClose} />
                    </View>
                    <FlatList
                        data={Object.keys(icons)}
                        renderItem={renderItem}
                        contentContainerStyle={styles.container}
                        numColumns={3}
                        initialNumToRender={18}
                        maxToRenderPerBatch={18}
                        windowSize={5}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    wrapper: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        overflow: 'hidden',
        width: '80%',
        maxHeight: '70%',
    },
    header: {
        padding: 10,
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    container: {
        paddingVertical: 10,
    },
    iconContainer: {
        width: '33.33%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    icon: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    }
});
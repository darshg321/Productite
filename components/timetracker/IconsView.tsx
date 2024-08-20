import {FlatList, View, Image, StyleSheet, Pressable} from "react-native";
import {icons} from "@/src/Utils";

export default function IconsView(props) {
    function renderItem({ item }) {
        return (
            <View>
                <Pressable style={styles.iconContainer} onPress={() => props.onPressIcon(icons[item])}>
                    <Image style={styles.icon} source={item}/>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={Object.keys(icons).map(key => icons[key])}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f0f0f0',
    },
    container: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    iconContainer: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 5,
    },
    icon: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    }
});
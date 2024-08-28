import { Drawer } from "expo-router/drawer";
import { useKeepAwake } from "expo-keep-awake";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

export default function RootLayout() {
    useKeepAwake();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <AntDesign name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TimeTracker"
                    options={{
                        drawerLabel: 'Time Tracker',
                        title: 'Time Tracker',
                        drawerIcon: ({ color, size }) => (
                            <AntDesign name="clockcircleo" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="TodoList/index"
                    options={{
                        drawerLabel: 'Todo List',
                        title: 'Todo List',
                        drawerIcon: ({ color, size }) => (
                            <Octicons name="checklist" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
import { Stack } from "expo-router";

export default function TodoListLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false}} />
            <Stack.Screen name="EditTodo" options={{ headerShown: false}} />
        </Stack>
    );
}
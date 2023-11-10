import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="cart"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="orderProcess"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}

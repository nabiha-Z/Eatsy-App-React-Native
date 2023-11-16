import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
         <Stack.Screen
          name="delivery"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </Provider>
  );
}

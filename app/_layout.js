import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider publishableKey="pk_test_51LbsT9JfcyJU6VlBZDJPuWQ8sKlpBTH6oUcdOiTzHWnnGfeutu5f7JbUsp3ym4gZLDDlZaylmnMpWLvwZC0FjpXE00PySo3beq">
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
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}

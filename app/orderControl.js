import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  completeOrder,
  selectCartItems,
  selectCartTotal,
} from "./redux/slices/cartSlice";
import { urlFor } from "../sanity";

const OrderControlScreen = () => {
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedCartItems, setGroupedCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items?.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedCartItems(groupedItems);
  }, [items]);

  const orderSuccessfull = () => {
    if (items.length === 0) {
      alert("Add atleast one item in the Cart");
    } else {
      dispatch(completeOrder({ status: "completed" }));
      alert("Order Completed!");
      router.push("/");
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full">
        <View className="bg-white p-6 items-center justify-center">
          <View>
            <Text className="text-xl font-bold text-center">Order Status</Text>
          </View>
          <TouchableOpacity
            onPress={router.back}
            className="absolute left-5 p-2"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          <View className="m-7">
            <Text className="font-bold">Order Items</Text>
          </View>
          {Object.entries(groupedCartItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-primary_btn_color">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />

              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">$ {items[0]?.price} </Text>
            </View>
          ))}
        </ScrollView>

        <View className="bg-white p-5 mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">$ {cartTotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$ 5.00</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-bold">Order Total</Text>
            <Text className="text-gray-800 font-bold">
              $ {(cartTotal + 7).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-primary_btn_color rounded-lg p-4"
            onPress={() => orderSuccessfull()}
          >
            <Text className="text-white text-center text-lg font-bold">
              Order Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderControlScreen;

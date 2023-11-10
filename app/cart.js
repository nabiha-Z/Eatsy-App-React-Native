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
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "./redux/slices/cartSlice";
import { urlFor } from "../sanity";

const CartItemScreen = () => {
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

  const placeOrder = () => {
    if (items.length === 0) {
      alert("Add atleast one item in the Cart");
    } else {
      router.replace("/orderProcess");
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full">
        <View className="bg-white p-6 border-b-4 border-gray-100 shadow-sm mt-10">
          <View>
            <Text className="text-xl font-bold text-center">Cart</Text>
            {/* <Text>{restaurant?.title}</Text> */}
          </View>

          <Link href="../" className="rounded-full absolute top-3 right-5">
            <XCircleIcon size={50} color="#00CCBB" />
          </Link>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-54 mins</Text>
          <TouchableOpacity>
            <Text className="text-primary_btn_color">Change </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
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
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({ id: key }))}
              >
                <Text className="text-primary_btn_color text-xs">Remove</Text>
              </TouchableOpacity>
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
            onPress={() => placeOrder()}
          >
            <Text className="text-white text-center text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartItemScreen;

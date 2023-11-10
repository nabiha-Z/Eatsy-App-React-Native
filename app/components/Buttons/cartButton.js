import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";

const CartIcon = () => {
  const items = useSelector((state) => selectCartItems(state));
  const cartTotal = useSelector((state) => selectCartTotal(state));
  const router = useRouter();
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className=" flex-row rounded-lg bg-primary_btn_color p-4 items-center mx-6 justify-between"
        onPress={() => router.push("/cart")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-3 rounded-lg">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center">
          View Cart
        </Text>
        <Text className="text-lg text-white font-extrabold">
          $ {cartTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CartIcon;

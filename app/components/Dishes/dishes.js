import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import {
  addToCart,
  memoizedSelectCartItems,
  removeFromCart,
  selectCartItems,
  selectCartItemsById,
} from "../../redux/slices/cartSlice";
import { urlFor } from "../../../sanity";

export const Dishes = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => memoizedSelectCartItems(state, id));
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(addToCart({ id, name, description, price, image }));
  };

  const removeItem = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <>
      <TouchableOpacity
        className="bg-white border-t border-gray-100 p-4"
        onPress={() => setIsPressed(!isPressed)}
        key={id}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-500 mt-2 text-lg">$ {price}</Text>
          </View>
          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-200 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white">
          <View className="flex-row space-x-2 items-center m-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={() => removeItem()}
            >
              <MinusCircleIcon size={40} color="#38BD94" />
            </TouchableOpacity>
            <Text>{items?.length}</Text>
            <TouchableOpacity onPress={() => addItem()}>
              <PlusCircleIcon size={40} color="#38BD94" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

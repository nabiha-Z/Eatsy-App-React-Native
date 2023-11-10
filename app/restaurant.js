import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MapPinIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import {
  ArrowLeftIcon,
  StarIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { Dishes } from "./components/Dishes/dishes";
import CartIcon from "./components/Buttons/cartButton";

const RestaurantScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    id,
    imgurl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = params;

  const parsedDishes = JSON.parse(dishes);
  const parsedImgUrl = JSON.parse(imgurl);

  return (
    <>
      <CartIcon />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="relative">
          <Image
            source={{
              uri: urlFor( parsedImgUrl).url(),
            }}
            className="w-full h-56 bg-gray-200 p-4"
          />
          <TouchableOpacity
            onPress={router.back}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-green-500">{rating}</Text>
                <Text className="text-xs text-gray-500"> {genre}</Text>
                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color="blue" opacity={0.4} size={20} />
                  <Text className="text-xs text-gray-500">
                    Nearby {address}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="px-4 pt-6 mb-3 font-bold text-lg">Menu</Text>
          {parsedDishes?.map((dish) => (
            <Dishes
              key={dish._id}
              id={dish._id}
              name={dish.title}
              price={dish.price}
              image={dish.image}
              description={dish.description}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

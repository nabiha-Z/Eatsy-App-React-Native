import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { Link, Stack, useRouter } from "expo-router";

import { Categories } from "./components/Categories/categories";
import { FeaturedRow } from "./components/Featured/FeaturedRow";
import sanityClient from "../sanity";

export default function Home() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->{
              ...
            },
            type->{
              title
            }
          }
        }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <View
        className={`flex-row p-3 items-center mx-3 space-x-2 ${
          Platform.OS !== "ios" && "mt-16"
        }`}
      >
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-xs text-gray-500">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <Link href="/cart">
          <ShoppingCartIcon color="#00CCBB" size={35} />
        </Link>
      </View>

      <View className="flex-row items-center m-5 space-x-2">
        <View className="flex-row items-center">
          <MagnifyingGlassIcon color="gray" size={20} className="absolute" />
          <TextInput
            className="bg-slate-100 w-4/5 p-3"
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" size={20} />
      </View>

      <ScrollView
        className="bg-[#F7F8F9] pl-5 py-5"
        contentContainerStyle={{ paddingBottom: 170 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured List */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            restaurants={category.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

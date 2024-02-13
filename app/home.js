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
  Dimensions,
} from "react-native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  QueueListIcon,
  TruckIcon,
} from "react-native-heroicons/outline";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";
import { Link, Stack, useRouter } from "expo-router";

import { Banner } from "./components/Banner/banner";
import { FeaturedRow } from "./components/Featured/FeaturedRow";
import sanityClient from "../sanity";
import { useSelector } from "react-redux";

import { selectCartItems } from "./redux/slices/cartSlice";

export default function Home() {
  const orderStatus = useSelector((state) => state.status);
  const items = useSelector(selectCartItems);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const router = useRouter();
  const windowHeight = Dimensions.get("window").height;

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

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
        <TouchableOpacity className="" onPress={() => router.push("/cart")}>
          <View
            className="bg-blue-500 w-6 h-6 p-1 rounded-full items-center absolute
          z-20 mt-[-6px] ml-[-5px]"
          >
            <Text className="text-white text-[13px] font-bold">
              {items.length}
            </Text>
          </View>
          <ShoppingCartIcon color="#00CCBB" size={35} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center m-5 space-x-2">
        <View className="flex-row items-center">
          <TextInput
            className="bg-slate-100 w-[320px] p-3"
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
          <View
            className=" absolute justify-end items-end
          z-20 mt-[-10px] ml-72"
          >
            <MagnifyingGlassIcon
              color="gray"
              size={25}
              className=""
            />
          </View>
        </View>
        {orderStatus === "processing" ? (
          <TouchableOpacity
            className=""
            onPress={() => router.push("/orderControl")}
          >
            <View
              className="bg-red-300 w-5 h-5 p-1 rounded-full items-center absolute
          z-20 mt-[-6px] ml-[-5px]"
            >
              <Text className="text-white text-[13px] font-bold">1</Text>
            </View>
            <TruckIcon color="#00CCBB" size={29} />
          </TouchableOpacity>
        ) : (
          <AdjustmentsVerticalIcon color="#00CCBB" size={25} />
        )}
      </View>
      {orderStatus === "processing" && (
        <TouchableOpacity
          className={`bg-primary_btn_color w-4/5 absolute z-10  p-4 rounded-lg self-center`}
          style={{ top: windowHeight * 0.9 }}
          onPress={() => router.push("/delivery")}
        >
          <Text className="text-white text-center font-bold">Track Order</Text>
        </TouchableOpacity>
      )}
      <ScrollView
        className="bg-[#F7F8F9] pl-5 py-5"
        contentContainerStyle={{ paddingBottom: 170 }}
      >
        <Banner />

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

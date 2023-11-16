import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
export const Categories = ({ title, url }) => {
  let windowWidth = [(Dimensions.get("window").width * 0.8).toFixed(0)] - 2;

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Animatable.View className={`animate-fadeIn duration-1000 delay-300`}>
        <View
          className={`w-[${windowWidth}px] rounded-lg bg-gray-200 p-8 ml-12`}
        >
          <Animatable.View className="animate-fadeInLeft duration-1500 delay-900 pl-16">
            <Text className="text-lg text-gray-500 text-left font-bold">
              Quick Pick, Slick Bite!
            </Text>
            <View className="">
              <Text className="text-[13px] text-[#F3EAEA] text-justify">
                The forecast says that dress season has officially arrived!
              </Text>
            </View>
          </Animatable.View>
        </View>
        <Animatable.Image
          source={require("../../assets/images/bannerImg.gif")}
          animation="slideInUp"
          iteration
          Count={1}
          className="h-48 w-32 absolute z-20 mt-[-84px]"
        />
      </Animatable.View>
    </ScrollView>
  );
};

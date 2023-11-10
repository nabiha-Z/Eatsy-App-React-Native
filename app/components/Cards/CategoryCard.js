import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const CategoryCard = ({ title, url }) => {
  return (
    <TouchableOpacity className="relative mr-4">
      <Image
        source={{ uri: url }}
        className="h-24 w-24 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CategoryCard } from "../Cards/CategoryCard";
export const Categories = ({ title, url }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
      <CategoryCard title="Food" url="https://links.papareact.com/gn7" />
    </ScrollView>
  );
};

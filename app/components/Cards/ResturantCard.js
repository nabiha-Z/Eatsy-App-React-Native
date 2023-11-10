import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";

import { urlFor } from "../../../sanity";

export const RestaurantCard = ({
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
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/restaurant",
          params: {
            id,
            imgurl: JSON.stringify(imgurl),
            title,
            rating,
            genre,
            address,
            short_description,
            dishes: JSON.stringify(dishes),
            long,
            lat,
          },
        })
      }
      className="bg-white mr-3 shadow"
    >
      <Image
        source={{
          uri: urlFor(imgurl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1 mt-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

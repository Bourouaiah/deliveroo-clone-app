import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { urlFor } from "../sanity";

const RestaurantCard = ({
  id,
  imageUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  log,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Resturant", {
          id,
          imageUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          log,
          lat,
        });
      }}
      className="bg-white mr-3 shadow"
    >
      <Image source={{ uri: urlFor(imageUrl).url() }} className="w-64 h-36" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#00CCBB" opacity={0.5} size={22} />
          <Text>
            <Text className="text-[#00CCBB]">{rating}</Text>
            {" - "}
            {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500 overflow-scroll">
            Nearby - {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ imageUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2 rounded-md overflow-hidden">
      <View>
        <Image
          source={{ uri: imageUrl }}
          className="w-20 h-20"
        />
      </View>
      <Text className="absolute text-white bg-black px-[3px] py-[2px] rounded-md font-bold bottom-1 left-1">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

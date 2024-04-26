import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";


const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={() => { navigation.navigate("Basket")}} className="flex-row justify-between items-center py-3 px-6 mx-4 rounded-md bg-[#00CCBB]" disabled={items.length === 0}>
        <Text className="bg-[#01A296] text-white text-xl font-extrabold px-2 rounded-md">{`${items.length < 10 ? '0' : ''}${items.length}`}</Text>
        <Text className="text-white text-xl font-extrabold">View Basket</Text>
        <Text className="text-white font-extrabold">{`$${basketTotal < 10 ? '0' : ''}${basketTotal}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

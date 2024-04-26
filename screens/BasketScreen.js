import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";

import { useDispatch, useSelector } from "react-redux";

import { urlFor } from "../sanity";

import { selectResturants } from "../features/resturantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";

const BasketScreen = () => {
  const resturant = useSelector(selectResturants);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);


  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="relative flex-1">
      <View className="bg-white flex justify-center items-center p-5">
        <View>
          <Text className="text-xl font-extrabold">Basket</Text>
          <Text className="text-center text-gray-500">Nando's</Text>
        </View>
        <TouchableOpacity
          className="absolute top-3 right-2"
          onPress={navigation.goBack}
        >
          <XCircleIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white flex-row justify-between items-center my-6 p-3">
        <View className="flex-row items-center space-x-2">
          <Image
            className="w-7 h-7 rounded-full bg-gray-200"
            source={{ uri: "https://links.papareact.com/wru" }}
          />
          <Text>Deliver in 50-75 min</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#00CCBB]">Change</Text>
        </TouchableOpacity>
      </View>
      {Object.entries(groupedItemsInBasket).map(([key, item]) => {
        return (
          <View
            key={key}
            className="bg-white flex-row justify-between items-center p-2"
          >
            <View className="flex-row items-center space-x-2">
              <Text className="font-bold text-lg text-[#00CCBB]">
                {item.length} x
              </Text>
              <Image
                className="w-10 h-10 rounded-full"
                source={{ uri: urlFor(item[0]?.image).url() }}
              />
              <Text className="font-bold">{item[0].name}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Text className="font-bold">${item[0].price}</Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB]"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <View className="bg-white absolute w-full bottom-0 py-5 px-4">
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="text-gray-500">${basketTotal}</Text>
        </View>
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-500">Delivery Fee</Text>
          <Text className="text-gray-500">$5</Text>
        </View>
        <View className="flex-row justify-between items-center py-2">
          <Text className="font-bold">Order Total</Text>
          <Text className="font-extrabold">${basketTotal + 5}</Text>
        </View>
        <TouchableOpacity disabled={basketTotal == 0} className="bg-[#00CCBB] mx-4 rounded-md mt-4" onPress={() => navigation.navigate("PreparingOrder")}>
          <Text className="text-white text-center py-3 font-bold">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

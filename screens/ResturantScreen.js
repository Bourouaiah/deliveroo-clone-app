import React, { useLayoutEffect } from "react";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";

import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

import { urlFor } from "../sanity";

import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setResurant } from "../features/resturantSlice";

const ResturantScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const dispatch = useDispatch();

  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setResurant({
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
      })
    );
  }, [dispatch]);

  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-[200px]"
            source={{ uri: urlFor(imageUrl).url() }}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 bg-white p-2 rounded-full"
          >
            <ArrowLeftIcon color="#00CCBB" size={20} />
          </TouchableOpacity>
        </View>
        <View className="bg-white px-[10px] py-2">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row items-center space-x-1 my-[6px]">
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
          <Text>{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row justify-between items-center bg-white border-y border-gray-300 px-[10px] py-4">
          <View className="flex-row space-x-3 items-center">
            <QuestionMarkCircleIcon color="gray" size={20} />
            <Text className="text-md font-bold">Have a food allergy?</Text>
          </View>
          <ChevronRightIcon color="#00CCBB" size={20} />
        </TouchableOpacity>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 text-2xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      <BasketIcon />
    </>
  );
};

export default ResturantScreen;

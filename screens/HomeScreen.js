import React, { useLayoutEffect, useState, useEffect } from "react";

import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import sanityClient from "../sanity";

import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'featured'] {
      ..., 
      restaurantes[] -> {
        ..., 
        dishes[] -> 
      }
    }
    `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <ScrollView>
      <SafeAreaView className="bg-white flex-1">
        <View className="flex-row justify-between items-center px-3">
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: "https://links.papareact.com/wru" }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <View>
              <Text className="font-bold text-gray-400 text-xs">
                Deliver Now!
              </Text>
              <Text className="font-bold text-xl">
                Current Location <ChevronDownIcon size={20} color="#00CCBB" />
              </Text>
            </View>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>
        <View className="flex-row justify-between items-center space-x-5 my-4 px-3">
          <View className="bg-gray-200 flex-row items-center space-x-1 flex-1 py-2 px-4">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              placeholder="Restaurantes, groceries, dishes"
              keyboardType="default"
            />
          </View>
          <AdjustmentsHorizontalIcon size={24} color="#00CCBB" />
        </View>
        <View className="bg-gray-100">
          <Categories />
          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;

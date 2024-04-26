import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { ArrowRightIcon } from "react-native-heroicons/outline";

import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'featured' && _id == $id] {
          ..., 
          restaurantes[] -> {
            ..., 
            dishes[] ->, 
            type -> {
              name
            },  
          }
        }[0]`, { id }
      )
      .then((data) => setRestaurantes(data?.restaurantes));
  }, [id]);

  return (
    <View className="mt-4">
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-lg font-bold">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="my-4"
      >
        {restaurantes.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.name}
            imageUrl={restaurant.image}
            rating={restaurant.rating}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            genre={"Algeria"}
            log={restaurant.log}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

import { useNavigation } from "@react-navigation/native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectResturants } from "../features/resturantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";

import * as Progress from "react-native-progress";

const DeliverooScreen = () => {
  const navigation = useNavigation();
  const resturant = useSelector(selectResturants);
  return (
    <View className="bg-[#00CCBB] flex-1 relative">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} indeterminate={true} color="#00CCBB" />
          <Text className="mt-3 text-gray-500">
            Your order at {resturant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: resturant.lat,
          longitude: resturant.log,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: resturant.lat,
            longitude: resturant.log,
          }}
          title={resturant.title}
          description={resturant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center justify-between absolute bottom-0 w-full px-4 pb-4">
        <View className="flex-row items-center space-x-3">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-12 w-12 bg-gray-300 rounded-full"
          />
          <View>
            <Text className="text-lg">Yasser Fetouhi</Text>
            <Text className="text-gray-400">Your Rider</Text>
          </View>
        </View>
        <View>
          <Text className="text-[#00CCBB] text-lg font-bold">Call</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliverooScreen;

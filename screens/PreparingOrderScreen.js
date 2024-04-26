import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Deliveroo")
    }, 4000);
  }, [])

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
        <Animatable.Image
          source={require("../assets/deliveroo-order-loading.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="w-96 h-96"
        />
        <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
        >Waiting for Resturant to accept your order!</Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

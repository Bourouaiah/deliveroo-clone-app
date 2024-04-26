import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import { urlFor } from "../sanity";

import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if(!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((prevValue) => !prevValue)}
        className={`bg-white px-[10px] ${
          !isPressed ? "border-y" : ""
        } border-gray-300 py-4`}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1 pr-2">
            <Text className="font-bold text-lg">{name}</Text>
            <Text className="text-gray-400 my-2">{description}</Text>
            <Text className="text-gray-400">
              $<Text className="text-lg">{price}</Text>
            </Text>
          </View>
          <View>
            <Image
              className="w-[100px] h-[100px] rounded-md"
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="flex-row items-center space-x-1 py-2 px-[10px] bg-white">
          <TouchableOpacity disabled={!items.length > 0} onPress={removeItemFromBasket}>
            <MinusCircleIcon size={30} color={`${items.length > 0 ? '#00CCBB' : 'gray'}`} />
          </TouchableOpacity>
          <Text className="text-xl font-bold">{`${items.length < 10 ? '0' : ''}${items.length}`}</Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon size={30} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;

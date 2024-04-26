import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import ResturantScreen from "./screens/ResturantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliverooScreen from "./screens/DeliverooScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Resturant" component={ResturantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} options={{presentation: 'modal'}} />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{presentation: 'card', headerShown: false}} />
          <Stack.Screen name="Deliveroo" component={DeliverooScreen} options={{presentation: 'card', headerShown: false}} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

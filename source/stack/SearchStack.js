import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchDishFlatList from "../flatlist/SearchDishFlatlist";
import Dish from "../components/Dish";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="SearchDishFlatList">
      <Stack.Screen
        name="SearchDishFlatList"
        component={SearchDishFlatList}
        options={{
          headerShown: false,
          headerMode: "none",
        }}
      />
      <Stack.Screen
        name="SearchItemDetail"
        component={Dish}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

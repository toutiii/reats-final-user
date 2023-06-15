import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchDishFlatList from "../flatlist/SearchDishFlatlist";
import SearchItemDetailView from "../views/SearchItemDetailView";

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
        name="SearchItemDetailView"
        component={SearchItemDetailView}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

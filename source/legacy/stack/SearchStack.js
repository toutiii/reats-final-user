import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchDishFlatList from "../../flatlist/SearchDishFlatlist";
import SearchItemDetailView from "../../views/SearchItemDetailView";
import all_constants from "../../constants";

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
                    headerShown: true,
                    headerTitle: all_constants.go_back,
                }}
            />
        </Stack.Navigator>
    );
}

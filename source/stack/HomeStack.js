import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTopTab from "../toptabs/HomeTopTab";
import SearchItemDetailView from "../views/SearchItemDetailView";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeTopTab">
            <Stack.Screen
                name="HomeTopTab"
                component={HomeTopTab}
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

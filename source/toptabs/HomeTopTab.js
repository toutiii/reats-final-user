import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeDishesFlatlist from "../flatlist/HomeDishesFlatlist";
import all_constants from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();


export default function HomeTopTab() {
    return (
        <Tab.Navigator initialRouteName="NewDishes">
            <Tab.Screen
                name="NewDishes"
                component={HomeDishesFlatlist}
                initialParams={{ filter: "new" }}
                options={{
                    title: all_constants.home.news_feed_title.new,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="time-outline" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="FamousDishes"
                component={HomeDishesFlatlist}
                initialParams={{ filter: "famous" }}
                options={{
                    title: all_constants.home.news_feed_title.famous,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="flame" color={color} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

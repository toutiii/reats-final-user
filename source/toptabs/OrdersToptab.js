import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersFlatlist from "../flatlist/OrdersFlatlist";
import all_constants from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTopTab() {
    return (
        <Tab.Navigator initialRouteName="PendingOrders">
            <Tab.Screen
                name="PendingOrders"
                component={OrdersFlatlist}
                initialParams={{ filter: "pending" }}
                options={{
                    title: all_constants.pending_orders_view.title.pending,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="timer-outline"
                            size={24}
                            color="orange"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ProcessingOrders"
                component={OrdersFlatlist}
                initialParams={{ filter: "processing" }}
                options={{
                    title: all_constants.pending_orders_view.title.processing,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="food-turkey"
                            size={24}
                            color="black"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CompletedOrders"
                component={OrdersFlatlist}
                initialParams={{ filter: "completed" }}
                options={{
                    title: all_constants.pending_orders_view.title.completed,
                    tabBarIcon: () => (
                        <MaterialIcons name="done" size={24} color="green" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

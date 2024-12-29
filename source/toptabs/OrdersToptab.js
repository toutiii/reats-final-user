import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersFlatList from "../flatlist/OrdersFlatlist";
import all_constants from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTopTab() {
    const tabs = [
        {
            name: "PendingOrders",
            filter: "pending",
            label: all_constants.pending_orders_view.title.pending,
            icon: (
                <MaterialCommunityIcons name="timer-sand" size={24} color="orange" />
            ),
        },
        {
            name: "ProcessingOrders",
            filter: "processing",
            label: all_constants.pending_orders_view.title.processing,
            icon: (
                <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
            ),
        },
        {
            name: "CompletedOrders",
            filter: "completed",
            label: all_constants.pending_orders_view.title.completed,
            icon: <MaterialIcons name="done" size={24} color="green" />,
        },
    ];

    return (
        <Tab.Navigator
            initialRouteName="PendingOrders"
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarIndicatorStyle: { backgroundColor: "tomato" },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarBounces: true,
                animationEnabled: false,
            }}
        >
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={OrdersFlatList}
                    initialParams={{ filter: tab.filter }}
                    options={{
                        tabBarLabel: tab.label,
                        tabBarIcon: () => tab.icon,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

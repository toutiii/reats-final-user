import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchStack from "../stack/SearchStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import OrdersStack from "../stack/OrdersStack";
import all_constants from "../constants";
import CartStack from "../stack/CartStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            //initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarinactiveTintColor: "gray",
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === all_constants.tab.main_tab_navigator.order) {
                        iconName = "restaurant-outline";
                    } else if (
                        route.name === all_constants.tab.main_tab_navigator.pending
                    ) {
                        iconName = "hourglass-outline";
                    } else if (route.name == all_constants.tab.main_tab_navigator.cart) {
                        iconName = "cart";
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarButton: [
                    "AdressesStack",
                    "SettingsAddressForm",
                    "SettingsPersonalInformationForm",
                    "OrdersHistory",
                    "TabSearchStack",
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
            })}
        >
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.order}
                component={SearchStack}
            />
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.pending}
                component={OrdersStack}
                options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                        if (routeName === "OrderDetailView") {
                            return false;
                        }

                        return true;
                    })(route),
                })}
            />

            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.cart}
                component={CartStack}
            />
        </Tab.Navigator>
    );
}

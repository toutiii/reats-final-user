import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchStack from "../stack/SearchStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import OrdersStack from "../stack/OrdersStack";
import all_constants from "../constants";
import SettingsAddressForm from "../forms/SettingsAddressForm";
import SettingsCredentialsForm from "../forms/SettingsCredentialsForm";
import SettingsPersonalInformationForm from "../forms/SettingsPersonalInformationForm";
import AdressesStack from "../stack/AddressesStack";
import OrdersHistoryStack from "../stack/OrdersHistoryStack";
import CartStack from "../stack/CartStack";
import HomeStack from "../stack/HomeStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarinactiveTintColor: "gray",
                tabBarIcon: ({  color, size }) => {
                    let iconName;
                    if (route.name === all_constants.tab.main_tab_navigator.home) {
                        iconName = "home-outline";
                    } else if (
                        route.name === all_constants.tab.main_tab_navigator.order
                    ) {
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
                    "SettingsCredentialsForm",
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
                name={all_constants.tab.main_tab_navigator.home}
                component={HomeStack}
            />
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
            <Tab.Screen name="OrdersHistory" component={OrdersHistoryStack} />

            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.cart}
                component={CartStack}
            />

            <Tab.Screen
                name="SettingsCredentialsForm"
                component={SettingsCredentialsForm}
            />
            <Tab.Screen
                name="SettingsPersonalInformationForm"
                component={SettingsPersonalInformationForm}
            />
            <Tab.Screen name="SettingsAddressForm" component={SettingsAddressForm} />
            <Tab.Screen name="AdressesStack" component={AdressesStack} />
        </Tab.Navigator>
    );
}

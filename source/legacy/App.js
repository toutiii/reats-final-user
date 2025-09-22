import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { stripePublishableKey } from "../env";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import OTPView from "./views/OTPView";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

import SettingsPersonalInformationForm from "./forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "./forms/SettingsAddressForm";
import AdressesStack from "./stack/AddressesStack";
import OrdersHistoryStack from "./stack/OrdersHistoryStack";
import OrderRateView from "./views/OrderRateView";
import all_constants from "../constants";

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StripeProvider
                    publishableKey={stripePublishableKey}
                    merchantIdentifier="merchant.identifier" // required for Apple Pay
                    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                >
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="LoginForm">
                            <Stack.Screen
                                name="MainDrawerNavigator"
                                component={MainDrawerNavigator}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="OTPView"
                                component={OTPView}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="LoginForm"
                                component={LoginForm}
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="SignupForm"
                                component={SignupForm}
                                options={{
                                    headerShown: true,
                                    headerTitle: all_constants.go_back,
                                }}
                            />
                            <Stack.Screen
                                name="SettingsPersonalInformationForm"
                                component={SettingsPersonalInformationForm}
                                options={{
                                    headerShown: true,
                                    headerTitle: all_constants.go_back,
                                }}
                            />
                            <Stack.Screen
                                name="SettingsAddressForm"
                                component={SettingsAddressForm}
                                options={{
                                    headerShown: true,
                                    headerTitle: all_constants.go_back,
                                }}
                            />
                            <Stack.Screen
                                name="AdressesStack"
                                component={AdressesStack}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="OrdersHistory"
                                component={OrdersHistoryStack}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="OrderRateView"
                                component={OrderRateView}
                                options={{
                                    headerShown: true,
                                    headerTitle: all_constants.go_back,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </StripeProvider>
            </SafeAreaView>
        );
    }
}

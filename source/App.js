import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import OTPView from "./views/OTPView";

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
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
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="LoginForm"
                            component={LoginForm}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="SignupForm"
                            component={SignupForm}
                            options={{ headerShown: true, headerTitle: "" }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        );
    }
}

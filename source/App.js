import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainDrawerNavigator">
            <Stack.Screen
              name="MainDrawerNavigator"
              component={MainDrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

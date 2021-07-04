import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import {createStackNavigator} from "@react-navigation/stack";
import MainTabNavigator from "./tab/MainTabNavigator";

const Stack = createStackNavigator();

export default class App extends Component {
  render () {
    return (
        <AppearanceProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                  name="MainTabNavigator"
                  component={MainTabNavigator}
                  options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppearanceProvider>
    )
  }
}

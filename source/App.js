import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import MainTabNavigator from "./tab/MainTabNavigator";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default class App extends Component {
  render () {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MainTabNavigator"
                        component={MainTabNavigator}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
  }
}

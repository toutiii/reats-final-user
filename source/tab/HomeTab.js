import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";
import NewDishesFlatList from "../flatlist/NewDishesFlatList";

const Tab = createMaterialTopTabNavigator();

export default function HomeTab () {
    return(
        <Tab.Navigator
            initialRouteName='New'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    marginTop: '10%'
                },
            }}
        >
            <Tab.Screen
                name="New"
                component={NewDishesFlatList}
                options={{ title: all_constants.home.tab.new.title }}
            />
            <Tab.Screen
                name="Best"
                component={NewDishesFlatList}
                options={{ title: all_constants.home.tab.best.title }}
                />
            <Tab.Screen
                name="Famous"
                component={NewDishesFlatList}
                options={{ title: all_constants.home.tab.famous.title }}
            />
        </Tab.Navigator>
    )
}

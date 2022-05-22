import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SimpleView from "../views/SimpleView";
import HomeView from "../views/HomeView";
import SearchStack from "../stack/SearchStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline'
                    }else if (route.name === 'Search') {
                        iconName = 'restaurant-outline';
                    }else if (route.name === 'Archives') {
                        iconName = 'archive-outline';
                    }else if (route.name === 'Pending') {
                        iconName = 'hourglass-outline';
                    }else if (route.name === 'Settings') {
                        iconName = 'settings-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarButton: [

                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeView} />
            <Tab.Screen name="Search" component={SearchStack}/>
            <Tab.Screen name="Pending" component={SimpleView} />
            <Tab.Screen name="Archives" component={SimpleView} />
            <Tab.Screen name="Settings" component={SimpleView} />
        </Tab.Navigator>
    )
}

import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchView from "../views/SearchView";
import all_constants from "../constants";
import SearchItemDetailView from "../views/SearchItemDetailView";

const Stack = createStackNavigator();

export default class SearchStack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={SearchView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchItemDetailView"
          component={SearchItemDetailView}
          options={{
            headerShown: true,
            title:
              all_constants.search.stack_navigator.search_item_detail.title,
          }}
        />
      </Stack.Navigator>
    );
  }
}

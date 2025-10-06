import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddressesFlatlist from "../flatlist/AddressesFlatlist";
import SettingsAddressForm from "../forms/SettingsAddressForm";
import all_constants from "../constants";

const Stack = createStackNavigator();

export default class AdressesStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="AdressesFlatlist">
                <Stack.Screen
                    name="AdressesFlatlist"
                    component={AddressesFlatlist}
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
            </Stack.Navigator>
        );
    }
}

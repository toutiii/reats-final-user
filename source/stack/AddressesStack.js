import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddressesFlatlist from "../flatlist/AddressesFlatlist";
import SettingsAddressForm from "../forms/SettingsAddressForm";

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
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SettingsAddressForm"
                    component={SettingsAddressForm}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        );
    }
}

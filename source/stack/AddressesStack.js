import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import all_constants from "../constants";
import AddressesFlatlist from "../flatlist/AddressesFlatlist";
import SettingsAddressForm from "../forms/SettingsAddressForm";

const Stack = createStackNavigator();

export default class AdressesStack extends Component {
    constructor(props) {
        super(props);
        console.log(props.route.params.item);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={AddressesFlatlist}
                    initialParams={{ item: this.props.route.params.item }}
                    options={{
                        headerShown: true,
                        title: all_constants.drawercontent.drawer_item.label.localization,
                    }}
                />
                <Stack.Screen
                    name="SettingsAddressForm"
                    component={SettingsAddressForm}
                    options={{
                        headerShown: true,
                        title:
              all_constants.pending_orders_view.stack_navigator
                  .order_item_detail.title,
                    }}
                />
            </Stack.Navigator>
        );
    }
}

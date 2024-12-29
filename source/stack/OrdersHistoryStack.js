import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersHistoryFlatList from "../flatlist/OrdersHistoryFlatlist";
import OrderView from "../components/OrderView";

const Stack = createStackNavigator();

export default class OrdersHistoryStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName={this.props.route.name + "Home"}>
                <Stack.Screen
                    name={this.props.route.name + "Home"}
                    component={OrdersHistoryFlatList}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="HistoryOrderDetailView"
                    component={OrderView}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        );
    }
}

import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersHistoryFlatList from "../flatlist/OrdersHistoryFlatlist";
import OrderView from "../components/OrderView";
import all_constants from "../constants";

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
                        headerShown: true,
                        headerTitle: all_constants.go_back,
                    }}
                />
                <Stack.Screen
                    name="HistoryOrderDetailView"
                    component={OrderView}
                    options={{
                        headerShown: true,
                        headerTitle: all_constants.go_back,
                    }}
                />
            </Stack.Navigator>
        );
    }
}

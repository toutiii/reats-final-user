import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import all_constants from "../constants";
import OrdersHistoryFlatList from "../flatlist/OrdersHistoryFlatlist";
import OrderView from "../components/OrderView";

const Stack = createStackNavigator();

export default class OrdersHistoryStack extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name={this.props.route.name + "Home"}
                    component={OrdersHistoryFlatList}
                    options={{
                        headerShown: true,
                        title: all_constants.drawercontent.drawer_item.orders_history.title,
                    }}
                />
                <Stack.Screen
                    name="HistoryOrderDetailView"
                    component={OrderView}
                    options={{
                        headerShown: true,
                        title: "",
                    }}
                />
            </Stack.Navigator>
        );
    }
}

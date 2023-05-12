import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import all_constants from "../constants";
import OrdersFlatlist from "../flatlist/OrdersFlatlist";
import OrderDetailView from "../views/OrderDetailView";


const Stack = createStackNavigator();


export default class OrdersStack extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name={this.props.route.name + "Home"}
                    component={OrdersFlatlist}
                    initialParams={{ test: "test" }}
                    options={{
                        headerShown: true,
                        title: all_constants.pending_orders_view.main_title,
                    }}
                />
                <Stack.Screen
                    name="OrderDetailView"
                    component={OrderDetailView}
                    options={{
                        headerShown: true,
                        title: all_constants.pending_orders_view.stack_navigator.order_item_detail.title
                    }}
                />
            </Stack.Navigator>
        )
    }
}
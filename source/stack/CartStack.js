import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartFlatlist from "../flatlist/CartFlatlist";
import SearchItemDetailView from "../views/SearchItemDetailView";
import CartSummaryView from "../views/CartSummaryView";

const Stack = createStackNavigator();

export default function CartStack() {
    return (
        <Stack.Navigator initialRouteName="CartFlatlist">
            <Stack.Screen
                name="CartFlatlist"
                component={CartFlatlist}
                options={{
                    headerShown: false,
                    headerMode: "none",
                }}
            />
            <Stack.Screen
                name="SearchItemDetailView"
                component={SearchItemDetailView}
                options={{
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="CartSummaryView"
                component={CartSummaryView}
                options={{
                    headerTitle: "",
                }}
            />
        </Stack.Navigator>
    );
}

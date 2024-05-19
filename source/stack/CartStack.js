import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartFlatlist from "../flatlist/CartFlatlist";
import SearchItemDetailView from "../views/SearchItemDetailView";
import CartSummaryView from "../views/CartSummaryView";
import CartAdditionalItemsFlatlist from "../flatlist/CartAdditionalItemsFlatlist";
import all_constants from "../constants";
import CartDeliveryInfosView from "../views/CartDeliveryInfosView";

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
                name="CartAdditionalItemsDrinksFlatlist"
                component={CartAdditionalItemsFlatlist}
                options={{
                    headerTitle: all_constants.cart.title.drinks,
                }}
            />
            <Stack.Screen
                name="CartAdditionalItemsDessertsFlatlist"
                component={CartAdditionalItemsFlatlist}
                options={{
                    headerTitle: all_constants.cart.title.desserts,
                }}
            />
            <Stack.Screen
                name="CartAdditionalItemsStartersFlatlist"
                component={CartAdditionalItemsFlatlist}
                options={{
                    headerTitle: all_constants.cart.title.starter,
                }}
            />
            <Stack.Screen
                name="CartDeliveryInfosView"
                component={CartDeliveryInfosView}
                options={{
                    headerTitle: all_constants.cart.delivery.title,
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

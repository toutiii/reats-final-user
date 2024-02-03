import React from "react";
import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import { getDeliveryDateInfo } from "../helpers/toolbox";
import {
    Fontisto,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function OrderFlastlistItem({ ...props }) {
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: props.dish_photo }} style={{ flex: 1 }} />
            </View>
            <View style={{ flex: 2 }}>
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text numberOfLines={1} style={{ fontSize: 20 }}>
                        {props.dish_name}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name="food-turkey"
                            color="black"
                            size={20}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text>
                            {props.number_of_dishes}
                            {props.number_of_dishes > 1
                                ? all_constants.pending_orders_view.item_label.dishes
                                : all_constants.pending_orders_view.item_label.dish}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <FontAwesome name="money" size={15} color="black" />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text>
                            {all_constants.pending_orders_view.item_label.total}
                            {props.dish_price * props.number_of_dishes}
                            {all_constants.currency_symbol}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Fontisto name="shopping-basket" size={15} color="black" />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text>
                            {all_constants.pending_orders_view.item_label.ordered_at}
                            {getDeliveryDateInfo(
                                new Date(props.dish_order_datetime),
                                all_constants.short_french_date_format
                            )}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <FontAwesome name="hourglass-half" size={15} color="black" />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {all_constants.pending_orders_view.item_label.cooking}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

import React from "react";
import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import {
    Fontisto,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

export default function OrderFlastlistItem({ ...props }) {
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: props.itemPhoto }} style={{ flex: 1 }} />
            </View>
            <View style={{ flex: 2 }}>
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text numberOfLines={1} style={{ fontSize: 20 }}>
                        {props.itemName}
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
                            {props.itemQuantity}
                            {props.isItemADrink
                                ? props.itemQuantity > 1
                                    ? all_constants.pending_orders_view.item_label.drinks
                                    : all_constants.pending_orders_view.item_label.drink
                                : props.itemQuantity > 1
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
                        <FontAwesome name="euro" size={15} color="black" />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text>
                            {all_constants.pending_orders_view.item_label.total}
                            {props.itemPrice * props.itemQuantity}
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
                            {moment(props.itemOrderDate).format("dddd DD MMM à HH[h]mm")}
                        </Text>
                    </View>
                </View>

                {props.itemStatus === "pending" && (
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
                                {all_constants.pending_orders_view.item_label.pending}
                            </Text>
                        </View>
                    </View>
                )}

                {props.itemStatus === "processing" && (
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
                                {all_constants.pending_orders_view.item_label.processing}
                            </Text>
                        </View>
                    </View>
                )}

                {props.itemStatus === "completed" && (
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
                                {all_constants.pending_orders_view.item_label.completed}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

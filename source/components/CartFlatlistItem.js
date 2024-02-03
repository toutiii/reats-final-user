import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import React from "react";
import HorizontalLine from "../components/HorizontalLine";

export default function CartFlatlistItem({ ...props }) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "row",
                margin: "5%",
                elevation: 10,
            }}
        >
            <View style={{ flex: 1, aspectRatio: 2 }}>
                <Image source={{ uri: props.photo }} style={{ aspectRatio: 1 }} />
            </View>

            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: "300" }}>
                        {props.dish_name}
                    </Text>
                </View>
                <View style={{ flex: 1, marginLeft: "5%" }}>
                    <Text style={{ fontSize: 15 }}>
                        {all_constants.cart.label.item_price}
                        {props.dish_price}
                        {all_constants.currency_symbol}
                    </Text>
                </View>
                <View style={{ flex: 1, marginLeft: "5%" }}>
                    <Text style={{ fontSize: 15 }}>
                        {all_constants.cart.label.quantity}
                        {props.dish_ordered_quantity}
                    </Text>
                </View>
                <HorizontalLine
                    width={"80%"}
                    line_color={"tomato"}
                    margin_left={"5%"}
                />
                <View style={{ flex: 1, marginLeft: "5%" }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {all_constants.cart.label.item_sub_amount}
                        {props.dish_ordered_quantity * props.dish_price}
                        {all_constants.currency_symbol}
                    </Text>
                </View>
            </View>
        </View>
    );
}

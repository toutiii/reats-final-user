import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import React from "react";
import styles_dish_for_modal from "../styles/styles-dish-for-modal";
import HorizontalLine from "./HorizontalLine";

export default function DishForModal({ ...props }) {
    const modalFields = [
        "dish_quantity",
        "dish_unit_price",
        "dish_order_status",
        "dish_total",
    ];
    return (
        <View style={{ flex: 1 }}>
            <View style={styles_dish_for_modal.container}>
                <View style={{ flex: 1, aspectRatio: 1 }}>
                    <Image source={{ uri: props.dish_photo }} style={{ flex: 1 }} />
                </View>
                <View style={{ flex: 1, aspectRatio: 1 }}>
                    <View style={{ flex: 4 }}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text numberOfLines={1} style={{ fontSize: 24 }}>
                                {props.dish_name}
                            </Text>
                        </View>
                        {Object.keys(props).map((key) => {
                            if (modalFields.includes(key)) {
                                return (
                                    <View key={key} style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>
                                            {" "}
                                            {"\u2022"}{" "}
                                            {
                                                all_constants.drawercontent.drawer_item.orders_history
                                                    .infos[key]
                                            }
                                            {props[key]}
                                        </Text>
                                    </View>
                                );
                            }
                        })}
                    </View>
                </View>
            </View>
            <HorizontalLine />
        </View>
    );
}

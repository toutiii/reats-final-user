import React from 'react';
import { Image, Text, View } from "react-native";
import all_constants from '../constants';
import { getDeliveryDateInfo } from "../helpers/toolbox"


export default function OrderFlastlistItem({ ...props }) {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: props.dish_photo }}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={{ flex: 2, marginLeft: '3%' }}>
                <Text numberOfLines={1} style={{ fontSize: 18 }}>
                    {props.dish_name}
                </Text>

                <Text>
                    {props.number_of_dishes}
                    {
                        props.number_of_dishes > 1 ?
                            all_constants.pending_orders_view.item_label.dishes
                            : all_constants.pending_orders_view.item_label.dish}
                </Text>

                <Text>
                    {all_constants.pending_orders_view.item_label.total}
                    {props.dish_price * props.number_of_dishes}
                    {all_constants.currency_symbol}
                </Text>

                <Text>
                    {all_constants.pending_orders_view.item_label.ordered_at}
                    {
                        getDeliveryDateInfo(new Date(props.dish_order_datetime),
                            all_constants.short_french_date_format)
                    }
                </Text>

                <Text style={{ fontStyle: 'italic' }}>
                    {all_constants.pending_orders_view.item_label.cooking}
                </Text>
            </View>
        </View>

    )
}
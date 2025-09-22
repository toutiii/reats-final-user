import React from "react";
import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import CustomButton from "../components/CustomButton";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

export default function OrderDetailView({ ...props }) {
    moment.locale("fr");

    const itemPhoto = props.route.params.item.dish
        ? props.route.params.item.dish.photo
        : props.route.params.item.drink.photo;

    const itemName = props.route.params.item.dish
        ? props.route.params.item.dish.name
        : props.route.params.item.drink.name;

    const itemQuantity = props.route.params.item.dish_quantity
        ? props.route.params.item.dish_quantity
        : props.route.params.item.drink_quantity;

    const itemPrice = props.route.params.item.dish
        ? props.route.params.item.dish.price
        : props.route.params.item.drink.price;

    const itemOrderDate = props.route.params.item.created;

    const isItemADrink = props.route.params.item.drink
        ? true
        : false;

    const itemStatus = props.route.params.item.status;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: itemPhoto }}
                    style={{ aspectRatio: 16 / 9, width: "100%" }}
                />
            </View>

            <View style={{ flex: 2, alignItems: "center", backgroundColor: "white" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text numberOfLines={3} style={{ fontSize: 20, textAlign: "center" }}>
                        {itemName}
                    </Text>
                </View>

                <View style={{ width: "60%" }}>
                    <HorizontalLine line_color="tomato" />
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                        {itemQuantity}
                        {isItemADrink
                            ? itemQuantity > 1
                                ? all_constants.pending_orders_view.item_label.drinks
                                : all_constants.pending_orders_view.item_label.drink
                            : itemQuantity > 1
                                ? all_constants.pending_orders_view.item_label.dishes
                                : all_constants.pending_orders_view.item_label.dish}{" "}
                        {itemStatus === "pending" &&
              all_constants.pending_orders_view.item_label.pending.toLocaleLowerCase()}
                        {itemStatus === "processing" &&
              all_constants.pending_orders_view.item_label.processing.toLocaleLowerCase()}
                        {itemStatus === "completed" &&
              all_constants.pending_orders_view.item_label.completed.toLocaleLowerCase()}
                    </Text>
                </View>

                <View style={{ width: "60%" }}>
                    <HorizontalLine line_color="tomato" />
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 }}>
                        {all_constants.pending_orders_view.item_label.ordered_at}
                        {moment(itemOrderDate).locale("fr").format("dddd DD MMM")}
                        {all_constants.at}
                        {moment(itemOrderDate).locale("fr").format("HH[h]mm")}
                    </Text>
                </View>

                <View style={{ width: "60%" }}>
                    <HorizontalLine line_color="tomato" />
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 }}>
                        {all_constants.pending_orders_view.item_label.total}
                        {itemPrice * itemQuantity}
                        {all_constants.currency_symbol}
                    </Text>
                </View>

                {!props.route.params.item.is_order_deleted && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={
                                all_constants.pending_orders_view.button_label.cancel_order
                            }
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            backgroundColor={"red"}
                            label_color={"white"}
                            button_width={all_constants.screen.width - 40}
                            onPress={() => {
                                console.log("PRESSED");
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

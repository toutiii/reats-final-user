import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-paper";
import all_constants from "../constants";
import stylesOrder from "../styles/styles-order";
import {
    AntDesign,
    FontAwesome,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

export default function Order({ ...props }) {
    moment.locale("fr");
    const iconSize = 25;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        fontSize: 20,
                        color:
              props.order_status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.delivered
                  ? "green"
                  : "red",
                    }}
                >
                    {all_constants.drawercontent.drawer_item.orders_history.infos.number}{" "}
                    {props.order_number}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: "8%",
                }}
            >
                <View
                    style={{
                        flex: 2,
                        aspectRatio: 2,
                        alignItems: "center",
                        paddingLeft: "5%",
                    }}
                >
                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.delivered && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialIcons
                                    name="shopping-cart"
                                    size={iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.ordered
                                    }{" "}
                                    {moment(props.order_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}

                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_cooker && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialIcons name="cancel" size={iconSize} color="red" />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_cooker
                                    }{" "}
                                    {moment(props.order_final_state_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        </View>
                    )}

                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_customer && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialIcons name="cancel" size={iconSize} color="red" />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_customer
                                    }{" "}
                                    {moment(props.order_final_state_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={stylesOrder.row_element}>
                        {props.order_status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.delivered && (
                            <View style={stylesOrder.icon_element}>
                                <AntDesign name="checkcircle" size={iconSize} color="green" />
                            </View>
                        )}

                        {props.order_status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.delivered && (
                            <View style={stylesOrder.order_status_text_style}>
                                <Text numberOfLines={1} style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.delivered
                                    }{" "}
                                    {moment(props.order_final_state_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={stylesOrder.row_element}>
                        <View style={stylesOrder.icon_element}>
                            <FontAwesome name="money" size={iconSize} color="black" />
                        </View>
                        <View style={stylesOrder.order_status_text_style}>
                            <Text style={stylesOrder.order_text}>
                                {props.order_amount}
                                {all_constants.currency_symbol}
                            </Text>
                        </View>
                    </View>
                    <View style={stylesOrder.row_element}>
                        <View style={stylesOrder.icon_element}>
                            <MaterialCommunityIcons
                                name="food-turkey"
                                color="black"
                                size={iconSize}
                            />
                        </View>
                        <View style={stylesOrder.order_status_text_style}>
                            <Text style={stylesOrder.order_text}>
                                {props.dishes_number}{" "}
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .item
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Divider />
        </View>
    );
}

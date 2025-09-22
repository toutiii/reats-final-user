import React from "react";
import { Text, View } from "react-native";
import all_constants from "../constants";
import stylesOrder from "../styles/styles-order";
import {
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
                    }}
                >
                    {all_constants.drawercontent.drawer_item.orders_history.infos.number}
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
                                    all_constants.drawercontent.drawer_item.orders_history.status
                                        .ordered
                                }
                                {moment(props.order_creation_date).format(
                                    "dddd DD MMM à HH[h]mm",
                                )}
                            </Text>
                        </View>
                    </View>

                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.pending && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialCommunityIcons
                                    name="timer-sand"
                                    size={iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.pending
                                    }
                                </Text>
                            </View>
                        </View>
                    )}

                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.processing && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialCommunityIcons
                                    name="food-turkey"
                                    size={iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.processing
                                    }
                                    {moment(props.order_processing_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        </View>
                    )}

                    {props.order_status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.completed && (
                        <View style={stylesOrder.row_element}>
                            <View style={stylesOrder.icon_element}>
                                <MaterialIcons name="done" size={24} color="green" />
                            </View>
                            <View style={stylesOrder.order_status_text_style}>
                                <Text style={stylesOrder.order_text}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.completed
                                    }
                                    {moment(props.order_completed_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
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
                                    }
                                    {moment(props.order_cancelled_date).format(
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
                                    }
                                    {moment(props.order_cancelled_date).format(
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
                                <MaterialIcons
                                    name="delivery-dining"
                                    size={iconSize}
                                    color="green"
                                />
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
                                    }
                                    {moment(props.order_delivered_date).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={stylesOrder.row_element}>
                        <View style={stylesOrder.icon_element}>
                            <FontAwesome name="euro" size={iconSize} color="black" />
                        </View>
                        <View style={stylesOrder.order_status_text_style}>
                            <Text style={stylesOrder.order_text}>{props.total_amount}</Text>
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
                                {props.nb_of_items}
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .item
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

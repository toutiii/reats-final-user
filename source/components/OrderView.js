/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Animated, View, Text } from "react-native";
import styles_order_view from "../styles/styles-order-view";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import DishModal from "../modals/DishModal";
import {
    FontAwesome,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr"; // Import French locale
import { buildReadableAddress } from "../helpers/toolbox";
import CustomAlert from "./CustomAlert";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function OrderView(props) {
    // State for modal visibility
    const [
        modalVisible,
        setModalVisible
    ] = useState(false);

    // Set locale for moment.js
    useEffect(() => {
        moment.locale("fr");
    }, [
    ]);

    // Icon size
    const iconSize = 25;
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    // Handlers for modal visibility

    const onPressShowModal = () => setModalVisible(true);

    const onPressCloseModal = () => setModalVisible(false);

    const [
        showCancelOrderAlert,
        setShowCancelOrderAlert
    ] = useState(false);

    const [
        showCancelOrderSuccessAlert,
        setShowCancelOrderSuccessAlert
    ] =
    useState(false);

    const [
        showCancelOrderFailureAlert,
        setShowCancelOrderFailureAlert
    ] =
    useState(false);

    const [
        isUpdatingOrder,
        setIsUpdatingOrder
    ] = useState(false);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Extracting item data from props
    const { item } = props.route.params;

    async function updateOrderStatus() {
        const access = await getItemFromSecureStore("accessToken");
        const formData = new FormData();
        formData.append("status", "cancelled_by_customer");
        formData.append("cancelled_date", new Date().toISOString());

        const result = await callBackEnd(
            formData,
            `${apiBaseUrl}:${port}/api/v1/customers-orders/${item.id}/`,
            "PATCH",
            access,
            true,
        );

        if (result) {
            setShowCancelOrderSuccessAlert(true);
        } else {
            setShowCancelOrderFailureAlert(true);
        }
    }

    useEffect(() => {
        if (isUpdatingOrder) {
            fadeOut();
            setTimeout(() => {
                updateOrderStatus();
                setIsUpdatingOrder(false);
                fadeIn();
            }, 2000);
        }
    }, [
        isUpdatingOrder
    ]);

    return (
        <Animated.View
            style={{ flex: 1, backgroundColor: "white", opacity: fadeAnim }}
        >
            {modalVisible && (
                <DishModal
                    state={modalVisible}
                    onPressCloseModal={onPressCloseModal}
                    modal_data={item.items}
                />
            )}
            {isUpdatingOrder && (
                <View
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size="large" color="tomato" />
                </View>
            )}

            {showCancelOrderAlert && (
                <CustomAlert
                    show={showCancelOrderAlert}
                    title={all_constants.pending_orders_view.cancel.title}
                    message={
                        item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.pending
                            ? all_constants.pending_orders_view.cancel.pending_message
                            : all_constants.pending_orders_view.cancel.message
                    }
                    showCancelButton={true}
                    confirmButtonColor={"red"}
                    cancelButtonColor={"green"}
                    confirmText={all_constants.messages.understood}
                    cancelText={all_constants.messages.quit}
                    onConfirmPressed={() => {
                        setShowCancelOrderAlert(false);
                        setIsUpdatingOrder(true);
                    }}
                    onCancelPressed={() => {
                        setShowCancelOrderAlert(false);
                    }}
                />
            )}
            {showCancelOrderSuccessAlert && (
                <CustomAlert
                    show={showCancelOrderSuccessAlert}
                    title={all_constants.pending_orders_view.cancel.success.title}
                    message={all_constants.pending_orders_view.cancel.success.message}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowCancelOrderSuccessAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            {showCancelOrderFailureAlert && (
                <CustomAlert
                    show={showCancelOrderFailureAlert}
                    title={all_constants.pending_orders_view.cancel.failure.title}
                    message={all_constants.pending_orders_view.cancel.failure.message}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowCancelOrderFailureAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            <View style={{ flex: 3, backgroundColor: "white" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {
                                all_constants.drawercontent.drawer_item.orders_history.infos
                                    .number
                            }
                            {item.id}
                        </Text>
                    </View>

                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <MaterialIcons
                                name="shopping-cart"
                                size={iconSize}
                                color="black"
                            />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.status
                                        .ordered
                                }{" "}
                                {moment(item.created).format("dddd DD MMM à HH[h]mm")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <FontAwesome name="euro" size={iconSize} color="black" />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .amount
                                }
                                {item.total_amount} {all_constants.currency_symbol}
                            </Text>
                        </View>
                    </View>
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.delivered && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons
                                    name="delivery-dining"
                                    size={iconSize}
                                    color="green"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.delivered
                                    }{" "}
                                    {moment(item.delivery_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.pending && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name="timer-sand"
                                    size={iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.pending
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_cooker && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name="cancel" size={iconSize} color="red" />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_cooker
                                    }
                                    {moment(item.modified).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_customer && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name="cancel" size={iconSize} color="red" />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_customer
                                    }
                                    {moment(item.modified).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.processed && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name="food-turkey"
                                    size={iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.processed
                                    }{" "}
                                    {moment(item.processing_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.completed && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name="done" size={24} color="green" />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.completed
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <MaterialCommunityIcons
                                name="google-maps"
                                size={iconSize}
                                color="black"
                            />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {buildReadableAddress(item.address)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            {(item.status ===
        all_constants.drawercontent.drawer_item.orders_history.original_status
            .pending ||
        item.status ===
          all_constants.drawercontent.drawer_item.orders_history.original_status
              .processed ||
        item.status ===
          all_constants.drawercontent.drawer_item.orders_history.original_status
              .completed) && (
                <View style={{ flex: 1, alignItems: "center" }}>
                    <CustomButton
                        label={all_constants.modal.dish_modal.show}
                        backgroundColor="darkgrey"
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        onPress={onPressShowModal}
                        label_color="white"
                    />
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
                                setShowCancelOrderAlert(true);
                            }}
                        />
                    </View>
                </View>
            )}

            {(item.status ===
        all_constants.drawercontent.drawer_item.orders_history.original_status
            .delivered ||
        item.status ===
          all_constants.drawercontent.drawer_item.orders_history.original_status
              .cancelled_by_cooker ||
        item.status ===
          all_constants.drawercontent.drawer_item.orders_history.original_status
              .cancelled_by_customer ||
        item.status ===
          all_constants.drawercontent.drawer_item.orders_history.original_status
              .delivered) && (
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.modal.dish_modal.show}
                            backgroundColor="darkgrey"
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={onPressShowModal}
                            label_color="white"
                        />
                    </View>
                </View>
            )}
        </Animated.View>
    );
}

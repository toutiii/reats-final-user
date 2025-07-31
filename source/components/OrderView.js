/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Animated, View, Text, Alert, Platform, ToastAndroid } from "react-native";
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
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function OrderView(props) {
    // State for modal visibility
    console.log("props: ", props.route.params.item);
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

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (title, message, onConfirm = null, onCancel = null, confirmText = "OK", cancelText = null) => {
        if (Platform.OS === "android") {
            if (onCancel) {
                // Pour Android avec bouton d'annulation, utiliser Alert au lieu de Toast
                Alert.alert(
                    title,
                    message,
                    [
                        {
                            text: cancelText || all_constants.messages.cancel,
                            onPress: onCancel,
                            style: "cancel"
                        },
                        {
                            text: confirmText || "OK",
                            onPress: onConfirm || (() => {})
                        }
                    ]
                );
            } else {
                // Pour Android sans bouton d'annulation, utiliser Toast
                ToastAndroid.show(message || title, ToastAndroid.SHORT);
                if (onConfirm) {
                    setTimeout(onConfirm, 1000);
                }
            }
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            const buttons = [
            ];

            if (cancelText && onCancel) {
                buttons.push({
                    text: cancelText,
                    onPress: onCancel,
                    style: "cancel"
                });
            }

            buttons.push({
                text: confirmText || "OK",
                onPress: onConfirm || (() => {})
            });

            Alert.alert(
                title,
                message,
                buttons
            );
        }
    };

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
            // Afficher l'alerte de succès et retourner à l'écran précédent
            showMessage(
                all_constants.pending_orders_view.cancel.success.title,
                all_constants.pending_orders_view.cancel.success.message,
                () => props.navigation.goBack()
            );
        } else {
            // Afficher l'alerte d'échec et retourner à l'écran précédent
            showMessage(
                all_constants.pending_orders_view.cancel.failure.title,
                all_constants.pending_orders_view.cancel.failure.message,
                () => props.navigation.goBack()
            );
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
                    modal_data={item.dishes_items.concat(item.drinks_items)}
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

            {/* Le CustomAlert a été remplacé par un appel à la fonction showMessage */}
            {/* Le CustomAlert a été remplacé par un appel à la fonction showMessage */}
            {/* Le CustomAlert a été remplacé par un appel à la fonction showMessage */}
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
                                }
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
                                    }
                                    {moment(item.delivered_date).format("dddd DD MMM à HH[h]mm")}
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
                                    {moment(item.cancelled_date).format("dddd DD MMM à HH[h]mm")}
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
                                    {moment(item.cancelled_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
            all_constants.drawercontent.drawer_item.orders_history
                .original_status.processing && (
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
                                            .status.processing
                                    }
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
                                    {moment(item.completed_date).format("dddd DD MMM à HH[h]mm")}
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
              .processing ||
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
                                const message = item.status === all_constants.drawercontent.drawer_item.orders_history.original_status.pending
                                    ? all_constants.pending_orders_view.cancel.pending_message
                                    : all_constants.pending_orders_view.cancel.message;
                                showMessage(
                                    all_constants.pending_orders_view.cancel.title,
                                    message,
                                    () => setIsUpdatingOrder(true),
                                    () => {},
                                    all_constants.messages.understood,
                                    all_constants.messages.quit
                                );
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
            {item.status ===
        all_constants.drawercontent.drawer_item.orders_history.original_status
            .delivered && (
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "30%",
                        }}
                    >
                        <CustomButton
                            label={
                                props.route.params.item.rating === 0
                                    ? all_constants.modal.dish_modal.rate
                                    : all_constants.modal.dish_modal.show_rate
                            }
                            backgroundColor={all_constants.colors.inputBorderColor}
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={() => {
                                props.navigation.navigate("OrderRateView", {
                                    data: item.dishes_items.concat(item.drinks_items),
                                    customerID: item.address.customer,
                                    orderID: item.id,
                                    orderRate: props.route.params.item.rating,
                                    orderComment: props.route.params.item.comment,
                                    disableRating:
                    props.route.params.item.rating !== 0
                        ? true
                        : false,
                                });
                            }}
                            label_color="black"
                        />
                    </View>
                </View>
            )}
        </Animated.View>
    );
}

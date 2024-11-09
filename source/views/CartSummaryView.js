import React from "react";
import {
    ActivityIndicator,
    Animated,
    Text,
    TextInput,
    ScrollView,
    View,
} from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStripe } from "@stripe/stripe-react-native";
import CustomAlert from "../components/CustomAlert";
import { cleanCurrentOrderState } from "../helpers/toolbox.js";

export default function CartSummaryView({ ...props }) {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const [
        showPaymentSuccessAlert,
        setShowPaymentSuccessAlert
    ] =
    React.useState(false);

    const [
        isFetchingData,
        setIsFetchingData
    ] = React.useState(false);

    const [
        subTotal,
        setSubTotal
    ] = React.useState(0);

    const [
        currentOrderData,
        setCurrentOrderData
    ] = React.useState(null);

    const [
        deliveryFees,
        setDeliveryFees
    ] = React.useState(0);

    const [
        serviceFees,
        setServiceFees
    ] = React.useState(0);

    const [
        totalAmount,
        setTotalAmount
    ] = React.useState(0);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    async function getUserID() {
        const userID = await getItemFromSecureStore("userID");
        return userID;
    }

    const addOrderIDToStorage = async (orderID) => {
        try {
            await AsyncStorage.setItem("orderID", JSON.stringify(orderID));
        } catch (e) {
            console.log("Error while storing orderID: ", e);
        }
    };

    const getOrderIDFromStorage = async () => {
        try {
            const orderID = await AsyncStorage.getItem("orderID");
            return JSON.parse(orderID);
        } catch (e) {
            console.log("Error while getting orderID: ", e);
        }
    };

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            style: "alwaysDark",
            customFlow: false,
            merchantDisplayName: all_constants.merchantDisplayName,
            customerId: currentOrderData.customer.stripe_id,
            customerEphemeralKeySecret: currentOrderData.ephemeral_key,
            paymentIntentClientSecret: currentOrderData.stripe_payment_intent_secret,
            allowsDelayedPaymentMethods: false,
            defaultBillingDetails: {
                name:
          currentOrderData.customer.firstname +
          " " +
          currentOrderData.customer.lastname,
            },
        });
        if (!error) {
            console.log("Payment sheet initialized successfully");
        }
    };

    const openPaymentSheet = async () => {
        try {
            const { error } = await presentPaymentSheet();

            if (!error) {
                setShowPaymentSuccessAlert(true);
            }
        } catch (e) {
            console.log("Error in openPaymentSheet: ", e);
        }
    };

    const buildOrderItems = () => {
        let orderItems = [
        ];
        props.route.params.cartItems.map((item) => {
            item.capacity
                ? orderItems.push({
                    drinkID: item.id,
                    drinkOrderedQuantity: item.dish_ordered_quantity,
                })
                : orderItems.push({
                    dishID: item.id,
                    dishOrderedQuantity: item.dish_ordered_quantity,
                });
        });

        return orderItems;
    };

    React.useEffect(() => {
        if (currentOrderData !== null) {
            initializePaymentSheet();
        }
    }, [
        currentOrderData
    ]);

    React.useEffect(() => {
        const getOrderData = async () => {
            setIsFetchingData(true);
            fadeOut();
            console.log("Requesting backend to create a new order...");

            let formData = new FormData();
            formData.append("addressID", props.route.params.addressID);
            formData.append("customerID", await getUserID());
            formData.append("items", JSON.stringify(buildOrderItems()));
            if (
                props.route.params.deliveryMode ===
        all_constants.search.delivery_mode.original_scheduled_name
            ) {
                if (props.route.params.originalDeliveryDate !== undefined) {
                    formData.append("date", props.route.params.originalDeliveryDate);
                }
                if (props.route.params.deliveryTime !== undefined) {
                    formData.append("time", props.route.params.deliveryTime + ":00");
                }
            }
            const orderID = await getOrderIDFromStorage();
            console.log("orderID inside UseEffect: ", orderID);
            const url =
        orderID === null
            ? `${apiBaseUrl}:${port}/api/v1/customers-orders/`
            : `${apiBaseUrl}:${port}/api/v1/customers-orders/${orderID}/`;
            const urlMethod = orderID === null
                ? "POST"
                : "PUT";
            const access = await getItemFromSecureStore("accessToken");
            const result = await callBackEnd(
                formData,
                url,
                urlMethod,
                access,
                true,
                null,
            );
            setCurrentOrderData(result.data);
            setDeliveryFees(result.data.delivery_fees);
            setServiceFees(result.data.service_fees);
            setSubTotal(result.data.sub_total);
            setTotalAmount(result.data.total_amount);
            await addOrderIDToStorage(result.data.id);
            console.log("result: ", result.data);
            setIsFetchingData(false);
            fadeIn();
        };
        getOrderData();
    }, [
    ]);

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
        >
            {isFetchingData
                ? (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "white",
                            alignItems: "center",
                            marginTop: "5%",
                        }}
                    >
                        <ActivityIndicator size="large" color="tomato" />
                    </View>
                )
                : (
                    <ScrollView>
                        {showPaymentSuccessAlert && (
                            <CustomAlert
                                show={showPaymentSuccessAlert}
                                title={all_constants.cart.payment.success_title}
                                message={all_constants.cart.payment.success_message}
                                confirmButtonColor={"green"}
                                onConfirmPressed={() => {
                                    setShowPaymentSuccessAlert(false);
                                    props.navigation.popToTop();
                                    props.navigation.navigate("SearchDishFlatList");
                                    cleanCurrentOrderState();
                                }}
                            />
                        )}

                        <View>
                            <View style={{ height: 30, alignItems: "center" }}>
                                <Text style={{ fontStyle: "italic", fontSize: 22 }}>
                                    {all_constants.cart.summary.title}
                                </Text>
                            </View>

                            <View style={{ height: 300 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.sub_amount}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {subTotal} {all_constants.currency_symbol}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.delivery_fees}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {deliveryFees} {all_constants.currency_symbol}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.service_fees}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {serviceFees} {all_constants.currency_symbol}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.total_amount}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {totalAmount}
                                            {all_constants.currency_symbol}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 25 }}></View>

                        <View>
                            <View style={{ height: 50, alignItems: "center" }}>
                                <Text style={{ fontStyle: "italic", fontSize: 22 }}>
                                    {all_constants.cart.summary.delivery_infos}
                                </Text>
                            </View>

                            <View>
                                <View
                                    style={{
                                        height: 50,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.delivery_date}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 3, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {props.route.params.deliveryDate}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        height: 50,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.estimated_delivery_time}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {props.route.params.deliveryTime}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        height: 50,
                                        margin: "5%",
                                        flexDirection: "row",
                                        borderBottomWidth: 2,
                                        borderBottomColor: "tomato",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontStyle: "italic", fontSize: 18 }}>
                                            {all_constants.cart.summary.delivery_address}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            style={{
                                                fontStyle: "italic",
                                                fontSize: 18,
                                                textAlign: "right",
                                            }}
                                            value={props.route.params.deliveryAddress}
                                            numberOfLines={5}
                                            multiline={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 25 }}></View>

                        <View
                            style={{
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CustomButton
                                label={all_constants.cart.label.paid}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={17}
                                backgroundColor={"green"}
                                label_color={"white"}
                                button_width={all_constants.screen.width - 40}
                                onPress={() => {
                                    openPaymentSheet();
                                }}
                            />
                        </View>
                        <View style={{ height: 25 }}></View>
                    </ScrollView>
                )}
        </Animated.View>
    );
}

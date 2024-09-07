import React from "react";
import { Text, TextInput, ScrollView, View } from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function CartSummaryView({ ...props }) {
    console.log("\n CartSummaryView____PARAMS", props.route.params);
    function computeSubTotal() {
        let subTotal = 0;
        props.route.params.cartItems.map((item) => {
            subTotal += item.price * item.dish_ordered_quantity;
        });
        return subTotal;
    }

    const subTotal = computeSubTotal();

    const [
        currentOrderData, // eslint-disable-line no-unused-vars
        setCurrentOrderData,
    ] = React.useState(null);

    const [
        deliveryFees,
        setDeliveryFees
    ] = React.useState(0);

    const [
        servicePercentage,
        setServicePercentage, // eslint-disable-line no-unused-vars
    ] = React.useState(0.07);

    async function getUserID() {
        const userID = await getItemFromSecureStore("userID");
        return userID;
    }

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
        const getOrderData = async () => {
            console.log("Requesting backend to create a new order...");

            let formData = new FormData();
            if (props.route.params.originalDeliveryDate !== undefined) {
                formData.append("date", props.route.params.originalDeliveryDate);
            }
            if (props.route.params.deliveryTime !== undefined) {
                formData.append("time", props.route.params.deliveryTime + ":00");
            }
            formData.append("addressID", props.route.params.addressID);
            formData.append("customerID", await getUserID());
            formData.append("items", JSON.stringify(buildOrderItems()));

            const access = await getItemFromSecureStore("accessToken");
            const result = await callBackEnd(
                formData,
                `${apiBaseUrl}:${port}/api/v1/customers-orders/`,
                "POST",
                access,
                true,
                null,
            );
            setCurrentOrderData(result.data);
            setDeliveryFees(result.data.delivery_fees);
            console.log("result: ", result.data);
        };
        getOrderData();
    }, [
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
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
                                    {servicePercentage * subTotal} {all_constants.currency_symbol}
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
                                    {subTotal + servicePercentage * subTotal + deliveryFees}
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
                                    {all_constants.cart.summary.delivery_time}
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
                            //sendOrderToBackend();
                            console.log("PRESSED");
                        }}
                    />
                </View>
                <View style={{ height: 25 }}></View>
            </ScrollView>
        </View>
    );
}

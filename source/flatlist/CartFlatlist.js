import React, { useEffect, useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import all_constants from "../constants";
import CartFlatlistItem from "../components/CartFlatlistItem.js";
import CustomAlert from "../components/CustomAlert.js";
import { useFocusEffect } from "@react-navigation/native";
import {
    getAllCartItems,
    removeAllCartItems,
    removeGlobalCookerID,
} from "../helpers/toolbox.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartFlatlist(props) {
    const [
        showAlert,
        setShowAlert
    ] = useState(false);

    const [
        showRemoveAllItemResponseAlert,
        setShowRemoveAllItemResponseAlert
    ] =
    useState(false);

    const [
        data,
        setData
    ] = useState([
    ]);

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const [
        isAsyncStorageOperationOk,
        setIsAsyncStorageOperationOk
    ] =
    React.useState(false);

    const [
        clearCart,
        setClearCart
    ] = useState(false);

    const [
        cookerIDs,
        setCookerIDs
    ] = useState([
    ]);

    const [
        deliveryMode,
        setDeliveryMode
    ] = useState(null);

    useEffect(() => {
        const getDeliveryModeFromStorage = async () => {
            const deliveryModeFromStorage =
        await AsyncStorage.getItem("delivery_mode");
            setDeliveryMode(JSON.parse(deliveryModeFromStorage));
        };
        getDeliveryModeFromStorage();
    }, [
    ]);

    async function getAllCart() {
        setData([
        ]);
        setCookerIDs([
        ]);
        const results = await getAllCartItems();
        setData(results.data);
        setCookerIDs([
            ...new Set(results.data.map((item) => item.cooker))
        ]);
    }

    const removeAllItemsFromCart = async () => {
        const result = await removeAllCartItems();
        const resultCookerID = await removeGlobalCookerID();
        console.log("Remove global cooker ID: ", resultCookerID);
        console.log("Remove all items from cart: ", result);
        if (result && resultCookerID) {
            setIsAsyncStorageOperationOk(true);
            setShowRemoveAllItemResponseAlert(true);
        } else {
            setIsAsyncStorageOperationOk(false);
        }
    };

    const getNextNavigationViewName = async () => {
        if (
            deliveryMode ===
      all_constants.search.delivery_mode.original_scheduled_name
        ) {
            return "CartDeliveryInfosView";
        }

        if (deliveryMode === all_constants.search.delivery_mode.original_now_name) {
            return "AsapDeliveryInfosView";
        }

        throw new Error(`Delivery mode ${deliveryMode} is unknown`);
    };

    const nagivateToNextView = async () => {
        const nextViewName = await getNextNavigationViewName();
        props.navigation.navigate(nextViewName, {
            cartItems: data,
        });
    };

    useFocusEffect(
        useCallback(() => {
            fadeOut();
            getAllCart();
            fadeIn();
        }, [
        ]),
    );

    useEffect(() => {
        if (clearCart) {
            removeAllItemsFromCart();
            setClearCart(false);
        }
    }, [
        clearCart
    ]);

    return (
        <Animated.View
            style={{
                flex: 1,
                opacity: fadeAnim,
            }}
        >
            {data === null && (
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <ActivityIndicator size="large" color="tomato" />
                </View>
            )}
            {data.length > 0 && (
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        margin: "3%",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "center",
                            marginLeft: "5%",
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                props.navigation.navigate(
                                    "CartAdditionalItemsStartersFlatlist",
                                    {
                                        cookerIDs: cookerIDs,
                                        category: "starter",
                                    },
                                );
                            }}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <MaterialCommunityIcons
                                name="bowl-mix"
                                color={"tomato"}
                                size={35}
                            />
                        </TouchableHighlight>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                props.navigation.navigate("CartAdditionalItemsDrinksFlatlist", {
                                    cookerIDs: cookerIDs,
                                    category: "drink",
                                });
                            }}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <MaterialCommunityIcons
                                name="bottle-soda-classic-outline"
                                color={"tomato"}
                                size={35}
                            />
                        </TouchableHighlight>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-end",
                            justifyContent: "center",
                            marginRight: "5%",
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => {
                                props.navigation.navigate(
                                    "CartAdditionalItemsDessertsFlatlist",
                                    {
                                        cookerIDs: cookerIDs,
                                        category: "dessert",
                                    },
                                );
                            }}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <MaterialCommunityIcons
                                name="cupcake"
                                color={"tomato"}
                                size={35}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            )}

            {data !== null && (
                <View style={{ flex: 8 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "white",
                                    margin: "3%",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {all_constants.cart.empty_cart}
                                </Text>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flex: 1,
                                    aspectRatio: 5 / 2,
                                }}
                            >
                                <TouchableHighlight
                                    onPress={() => {
                                        props.navigation.navigate("SearchItemDetailView", {
                                            item: item,
                                            inCart: true,
                                        });
                                    }}
                                    style={{ flex: 1 }}
                                    underlayColor={all_constants.colors.inputBorderColor}
                                >
                                    <CartFlatlistItem {...item} />
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                </View>
            )}

            {data.length > 0 && (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        margin: "3%",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <TouchableHighlight
                                onPress={() => {
                                    setShowAlert(true);
                                }}
                                underlayColor={all_constants.colors.inputBorderColor}
                            >
                                <MaterialCommunityIcons
                                    name="delete-forever-outline"
                                    color={"red"}
                                    size={35}
                                />
                            </TouchableHighlight>
                        </View>

                        <View style={{ flex: 1, alignItems: "center" }}>
                            <TouchableHighlight
                                onPress={nagivateToNextView}
                                underlayColor={all_constants.colors.inputBorderColor}
                            >
                                <MaterialCommunityIcons
                                    name="basket-check"
                                    color={"green"}
                                    size={35}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            )}

            {showAlert && (
                <CustomAlert
                    show={showAlert}
                    title={all_constants.cart.alert.title}
                    message={all_constants.cart.alert.drop_cart_message}
                    confirmButtonColor="red"
                    showCancelButton={true}
                    cancelButtonColor="green"
                    cancelText={all_constants.messages.cancel}
                    onConfirmPressed={() => {
                        setShowAlert(false);
                        setClearCart(true);
                    }}
                    onCancelPressed={() => {
                        setShowAlert(false);
                    }}
                />
            )}

            {showRemoveAllItemResponseAlert && (
                <CustomAlert
                    show={showRemoveAllItemResponseAlert}
                    message={
                        isAsyncStorageOperationOk
                            ? all_constants.cart.clear_cart_alert.clear_cart_success_message
                            : all_constants.cart.clear_cart_alert.clear_cart_error_message
                    }
                    confirmButtonColor={isAsyncStorageOperationOk
                        ? "green"
                        : "red"}
                    showCancelButton={false}
                    onConfirmPressed={() => {
                        setShowRemoveAllItemResponseAlert(false);
                        if (isAsyncStorageOperationOk) {
                            props.navigation.goBack();
                        }
                    }}
                />
            )}
        </Animated.View>
    );
}

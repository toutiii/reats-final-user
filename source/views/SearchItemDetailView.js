import React from "react";
import {
    Animated,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    Platform,
    ToastAndroid,
} from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
    storeCartItem,
    storeGlobalCookerID,
    removeCartItem,
    getAdditionalItemsKeys,
    getCartItem,
    removeMultipleItemsFromCart,
} from "../helpers/toolbox.js";

export default function SearchItemDetailView({ ...props }) {
    const [
        numberOfItem,
        setNumberOfItem
    ] = React.useState(
        props.route.params.item.dish_ordered_quantity
            ? props.route.params.item.dish_ordered_quantity
            : 1,
    );

    const maxDishOrder = 10;

    const minDishOrder = 1;

    const previousScreenName = props.navigation.getState().routes[0].name;

    const [
        cartItemObject,
        setCartItemObject, // eslint-disable-line no-unused-vars
    ] = React.useState({
        ...JSON.parse(JSON.stringify(props.route.params.item)),
        dish_ordered_quantity: numberOfItem,
    });

    const [
        cookerID,
        setCookerID, // eslint-disable-line no-unused-vars
    ] = React.useState(props.route.params.item.cooker.id);

    const [
        isAsyncStorageOperationOk,
        setIsAsyncStorageOperationOk
    ] =
    React.useState(false);

    const [
        itemsWhichWillBeRemoved,
        setItemsWhichWillBeRemoved
    ] = React.useState(
        [
        ]
    );

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (title, message, onConfirm = null, onCancel = null, confirmText = "OK", cancelText = null) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(message || title, ToastAndroid.SHORT);
            if (onConfirm) {
                setTimeout(onConfirm, 1000);
            }
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            const buttons = [];
            
            if (cancelText && onCancel) {
                buttons.push({
                    text: cancelText,
                    onPress: onCancel,
                    style: "cancel"
                });
            }

            buttons.push({
                text: confirmText,
                onPress: onConfirm || (() => {})
            });
            
            Alert.alert(
                title,
                message,
                buttons
            );
        }
    };

    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const increaseItemNumber = () => {
        if (numberOfItem < maxDishOrder) {
            setNumberOfItem(numberOfItem + 1);
        }
    };

    const decreaseItemNumber = () => {
        if (numberOfItem > minDishOrder) {
            setNumberOfItem(numberOfItem - 1);
        }
    };

    const addItemToCart = async () => {
        const addItemResult = await storeCartItem({
            ...cartItemObject,
            dish_ordered_quantity: numberOfItem,
        });
        const addCookerIDResult = await storeGlobalCookerID(
            props.route.params.item.cooker.id,
        );

        console.log("Add status: ", addItemResult);
        console.log("Add cooker ID status: ", addCookerIDResult);

        if (addItemResult && addCookerIDResult) {
            setIsAsyncStorageOperationOk(true);
            showMessage(
                "",
                getItemAddedToCartMessage(),
                () => {
                    goAway();
                }
            );
        } else {
            setIsAsyncStorageOperationOk(false);
            showMessage(
                all_constants.messages.failed.title,
                "Erreur lors de l'ajout au panier"
            );
        }
    };

    const removeItemFromCart = async () => {
        const result = await removeCartItem(props.route.params.item.id);
        console.log("Remove status: ", result);
        setIsAsyncStorageOperationOk(result);

        if (result) {
            showMessage(
                "",
                all_constants.cart.remove_item_alert.remove_item_success_message,
                () => goAway()
            );
        } else {
            showMessage(
                all_constants.messages.failed.title,
                all_constants.cart.remove_item_alert.remove_item_error_message
            );
        }
    };

    const removeCurrentItemAndRelatedAdditionalItemsFromCart = async () => {
        const keysToRemove = [
        ];
        keysToRemove.push(props.route.params.item.id);
        itemsWhichWillBeRemoved.map((item) => {
            keysToRemove.push(item.id);
        });
        const result = await removeMultipleItemsFromCart(keysToRemove);
        console.log("Remove status: ", result);
        setIsAsyncStorageOperationOk(result);

        if (result) {
            showMessage(
                "",
                all_constants.cart.remove_item_alert.remove_item_success_message,
                () => goAway()
            );
        } else {
            showMessage(
                all_constants.messages.failed.title,
                all_constants.cart.remove_item_alert.remove_item_error_message
            );
        }
    };

    const handleAlert = async () => {
        const additionalItemsKeys = await getAdditionalItemsKeys(
            props.route.params.item.id,
        );
        if (additionalItemsKeys.length > 0) {
            const additionalItemsObjects = [];
            for (const key of additionalItemsKeys) {
                const item = await getCartItem(key);
                additionalItemsObjects.push(item);
            }
            setItemsWhichWillBeRemoved(additionalItemsObjects);

            // Afficher l'alerte pour les éléments supplémentaires
            Alert.alert(
                all_constants.cart.alert.title,
                buildAlertMessageForAdditionalItemsDeletion(),
                [
                    {
                        text: all_constants.messages.cancel,
                        onPress: () => {}, // Confirmer (annuler la suppression)
                    },
                    {
                        text: all_constants.messages.delete,
                        onPress: () => removeCurrentItemAndRelatedAdditionalItemsFromCart(), // Annuler (confirmer la suppression)
                    },
                ]
            );
        } else {
            // Afficher l'alerte simple pour supprimer l'élément
            Alert.alert(
                all_constants.cart.alert.title,
                all_constants.cart.alert.remove_item_from_cart_message,
                [
                    {
                        text: all_constants.messages.cancel,
                        onPress: () => {}, // Ne rien faire si on confirme
                    },
                    {
                        text: "Supprimer",
                        onPress: () => removeItemFromCart(), // Supprimer si on annule
                    },
                ]
            );
        }
    };

    const buildAlertMessageForAdditionalItemsDeletion = () => {
        let message =
      all_constants.cart.alert.remove_item_with_additional_items_message;
        for (let i = 0; i < itemsWhichWillBeRemoved.length; i++) {
            message += itemsWhichWillBeRemoved[i].name;
            message += ", ";
        }
        message += ".";
        message = message.replace(", .", ".");
        return message;
    };

    const goAway = () => {
        if (previousScreenName === "SearchDishFlatList") {
            props.navigation.popTo(previousScreenName, {
                cookerID: cookerID,
            });
        } else {
            props.navigation.goBack();
        }
    };

    const getItemAddedToCartMessage = () => {
        let message;

        if (isAsyncStorageOperationOk) {
            if (previousScreenName === "SearchDishFlatList") {
                message =
          all_constants.cart.add_item_alert.add_item_success_message_advanced;
            } else {
                message = all_constants.cart.add_item_alert.add_item_success_message;
            }
        } else {
            message = all_constants.cart.add_item_alert.add_item_error_message;
        }

        return message;
    };

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
        >
            <View style={{ flex: props.route.params.inCart
                ? 1
                : 2 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text numberOfLines={1} style={{ fontSize: 20 }}>
                        {props.route.params.item.name}
                    </Text>
                </View>

                <View style={{ flex: 4 }}>
                    <Image
                        source={{ uri: props.route.params.item.photo }}
                        style={{ aspectRatio: 16 / 9 }}
                    />
                </View>
            </View>

            <View
                style={{
                    flex: 2,
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        margin: "3%",
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 20 }}>
                            {props.route.params.item.price + all_constants.currency_symbol}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setShowAcceptanceRateAlert(true);
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            {props.route.params.item.cooker.acceptance_rate >= 75 && (
                                <MaterialCommunityIcons
                                    name="checkbox-marked-circle"
                                    size={24}
                                    color="green"
                                />
                            )}
                            {props.route.params.item.cooker.acceptance_rate >= 50 &&
                props.route.params.item.cooker.acceptance_rate < 75 && (
                                <MaterialIcons
                                    name="warning-amber"
                                    size={24}
                                    color="orange"
                                />
                            )}
                            {props.route.params.item.cooker.acceptance_rate < 50 && (
                                <MaterialIcons name="dangerous" size={24} color="red" />
                            )}
                            <Text
                                style={[
                                    {
                                        color:
                      props.route.params.item.cooker.acceptance_rate >= 75
                          ? "green"
                          : props.route.params.item.cooker.acceptance_rate < 50
                              ? "red"
                              : "orange",
                                    },
                                    { fontWeight: "bold" },
                                    { fontSize: 18 },
                                ]}
                            >
                                {props.route.params.item.cooker.acceptance_rate + "%"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <AntDesign name="star" size={24} color="tomato" />
                        <Text style={{ fontSize: 20 }}>
                            {props.route.params.item.rating
                                ? props.route.params.item.rating
                                : "-/-"}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: props.route.params.inCart
                            ? 3
                            : 3,
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "tomato",
                        borderTopWidth: 1,
                        borderTopColor: "tomato",
                        width: "90%",
                    }}
                >
                    <Text numberOfLines={3} style={{ fontSize: 16, textAlign: "center" }}>
                        {props.route.params.item.description}
                    </Text>
                </View>

                <View
                    style={{
                        flex: props.route.params.inCart
                            ? 1
                            : 2,
                        flexDirection: "row",
                        marginTop: props.route.params.inCart
                            ? "5%"
                            : "5%",
                    }}
                >
                    <View style={{ flex: 2, alignItems: "flex-end" }}>
                        <TouchableHighlight onPress={decreaseItemNumber}>
                            <AntDesign name="minuscircle" size={30} color="red" />
                        </TouchableHighlight>
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TextInput
                            value={numberOfItem.toString()}
                            style={{ fontSize: 20, color: "black" }}
                            editable={false}
                        />
                    </View>

                    <View style={{ flex: 2, alignItems: "flex-start" }}>
                        <TouchableHighlight onPress={increaseItemNumber}>
                            <AntDesign name="pluscircle" size={30} color="green" />
                        </TouchableHighlight>
                    </View>
                </View>

                <View
                    style={{
                        flex: props.route.params.inCart
                            ? 4
                            : 2,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{ flex: 1, justifyContent: "center", marginBottom: "7%" }}
                    >
                        <CustomButton
                            label={all_constants.search.button.label.add_to_cart}
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            backgroundColor={"green"}
                            label_color={"white"}
                            button_width={all_constants.screen.width - 40}
                            onPress={() => {
                                addItemToCart();
                            }}
                        />
                    </View>

                    {props.route.params.inCart && (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                bottom: "5%",
                            }}
                        >
                            <CustomButton
                                label={all_constants.cart.label.remove_from_cart}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={17}
                                backgroundColor={"red"}
                                label_color={"white"}
                                button_width={all_constants.screen.width - 40}
                                onPress={handleAlert}
                            />
                        </View>
                    )}
                </View>

                {/* Toutes les alertes CustomAlert ont été remplacées par des appels à la fonction showMessage */}
            </View>
        </Animated.View>
    );
}

import React from "react";
import {
    ActivityIndicator,
    Animated,
    Image,
    Text,
    TextInput,
    View,
} from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import styles_dish from "../styles/styles-dish";
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import CustomAlert from "../components/CustomAlert.js";
import { deleteItemFromCart, sendItemToCart } from "../api/cart";

export default function SearchItemDetailView({ ...props }) {
    const [
        numberOfItem,
        setNumberOfItem
    ] = React.useState(1);
    const maxDishOrder = 10;
    const minDishOrder = 1;
    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);
    const [
        showAddItemResponseAlert,
        setShowAddItemResponseAlert
    ] =
    React.useState(false);
    const [
        showRemoveItemResponseAlert,
        setShowRemoveItemResponseAlert
    ] =
    React.useState(false);
    const [
        cartItemObject,
        setCartItemObject
    ] = React.useState({
        ...JSON.parse(JSON.stringify(props.route.params.item)),
        dish_ordered_quantity: numberOfItem,
    });
    const [
        isCallingBackend,
        setIsCallingBackend
    ] = React.useState(false);
    const [
        isRequestOk,
        setIsRequestOk
    ] = React.useState(null);
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    if (props.route.params.item.dish_ordered_quantity !== undefined) {
        setNumberOfItem(props.route.params.item.dish_ordered_quantity);
    }

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

    const updateIsRequestState = (result) => {
        if (result.statusCode === 200) {
            setIsRequestOk(true);
        } else {
            setIsRequestOk(false);
        }
    };

    const removeItemFromCart = () => {
        setIsCallingBackend(true);
        async function callBackend() {
            const result = await deleteItemFromCart(cartItemObject);
            setShowRemoveItemResponseAlert(true);
            updateIsRequestState(result);
        }
        callBackend();
    };

    const addItemToCart = () => {
        setCartItemObject({
            ...cartItemObject,
            dish_ordered_quantity: numberOfItem,
        });

        setIsCallingBackend(true);

        async function callBackend() {
            const result = await sendItemToCart(cartItemObject);
            setShowAddItemResponseAlert(true);
            updateIsRequestState(result);
        }
        callBackend();
    };

    React.useEffect(() => {
        if (isCallingBackend) {
            setTimeout(() => {
                setIsCallingBackend(false);
            }, 300);
        }
    }, [
        isCallingBackend
    ]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Image
                source={{ uri: props.route.params.item.photo }}
                style={{ aspectRatio: 16 / 9 }}
            />

            <View
                style={{
                    flex: 2,
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                {isCallingBackend && (
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <ActivityIndicator size="large" color="tomato" />
                    </View>
                )}
                <View style={{ flex: 2, flexDirection: "row", margin: "4%" }}>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 20 }}>
                            {props.route.params.item.dish_name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 20 }}>
                            <Image
                                source={{ uri: all_constants.rating_star }}
                                style={styles_dish.rating_star}
                            />
                            {props.route.params.item.dish_rating}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 4,
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "tomato",
                        borderTopWidth: 1,
                        borderTopColor: "tomato",
                        width: "90%",
                    }}
                >
                    <Text numberOfLines={3} style={{ fontSize: 16, textAlign: "center" }}>
                        {props.route.params.item.dish_description}
                    </Text>
                </View>

                <View style={{ flex: 4, flexDirection: "row", margin: "10%" }}>
                    <View style={{ flex: 2, alignItems: "flex-end" }}>
                        <TouchableHighlight onPress={increaseItemNumber}>
                            <AntDesign name="pluscircle" size={30} color="green" />
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
                        <TouchableHighlight onPress={decreaseItemNumber}>
                            <AntDesign name="minuscircle" size={30} color="red" />
                        </TouchableHighlight>
                    </View>
                </View>

                <View
                    style={{
                        flex: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: "11%",
                    }}
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
                {props.route.params.in_cart && (
                    <View
                        style={{
                            flex: 2,
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
                            onPress={() => {
                                setShowAlert(true);
                            }}
                        />
                    </View>
                )}
                {showAlert && (
                    <CustomAlert
                        show={showAlert}
                        title={all_constants.cart.alert.title}
                        message={all_constants.cart.alert.remove_item_from_cart_message}
                        confirmButtonColor="red"
                        showCancelButton={true}
                        cancelButtonColor="green"
                        cancelText={all_constants.messages.cancel}
                        onConfirmPressed={() => {
                            setShowAlert(false);
                            removeItemFromCart();
                        }}
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                    />
                )}
                {showAddItemResponseAlert && (
                    <CustomAlert
                        show={showAddItemResponseAlert}
                        message={
                            isRequestOk
                                ? all_constants.cart.add_item_alert.add_item_success_message
                                : all_constants.cart.add_item_alert.add_item_error_message
                        }
                        confirmButtonColor={isRequestOk
                            ? "green"
                            : "red"}
                        showCancelButton={false}
                        onConfirmPressed={() => {
                            setShowAddItemResponseAlert(false);
                            if (isRequestOk) {
                                props.navigation.goBack();
                            }
                        }}
                    />
                )}
                {showRemoveItemResponseAlert && (
                    <CustomAlert
                        show={showRemoveItemResponseAlert}
                        message={
                            isRequestOk
                                ? all_constants.cart.remove_item_alert
                                    .remove_item_success_message
                                : all_constants.cart.remove_item_alert.remove_item_error_message
                        }
                        confirmButtonColor={isRequestOk
                            ? "green"
                            : "red"}
                        showCancelButton={false}
                        onConfirmPressed={() => {
                            setShowRemoveItemResponseAlert(false);
                            if (isRequestOk) {
                                props.navigation.goBack();
                            }
                        }}
                    />
                )}
            </View>
        </Animated.View>
    );
}

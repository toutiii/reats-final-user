import React, { useCallback,  useRef, useState } from "react";
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
import CustomButton from "../components/CustomButton";
import CustomAlert from "../components/CustomAlert.js";
import { useFocusEffect } from "@react-navigation/native";
import { getAllItemsFromCart } from "../api/cart";

export default function CartFlatlist(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [data, setData] = useState(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const timeOutDelay = 500;

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

    useFocusEffect(
        useCallback(() => {
            setData(null);
            fadeOut();
            setIsFetchingData(true);
            setTimeout(() => {
                async function getAllCart() {
                    const results = await getAllItemsFromCart();
                    setData(results.data);
                }
                getAllCart();
                fadeIn();
            }, timeOutDelay);

            return () => {
                setIsFetchingData(false);
            };
        }, [isFetchingData])
    );

    const dropCart = () => {
        console.log("REMOVED !");
    };

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: "white",
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
            {data !== null && data.length > 0 && (
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
                                    marginTop: "5%",
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
                                            in_cart: true,
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

            {data !== null && data.length > 0 && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomButton
                        label={all_constants.cart.validate_cart}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={"green"}
                        label_color={"white"}
                        button_width={all_constants.screen.width - 40}
                        onPress={() => {
                            props.navigation.navigate("CartSummaryView", {});
                        }}
                    />
                </View>
            )}
            {data !== null && data.length > 0 && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomButton
                        label={all_constants.cart.drop_cart}
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
                    message={all_constants.cart.alert.drop_cart_message}
                    confirmButtonColor="red"
                    showCancelButton={true}
                    cancelButtonColor="green"
                    cancelText={all_constants.messages.cancel}
                    onConfirmPressed={() => {
                        setShowAlert(false);
                        dropCart();
                    }}
                    onCancelPressed={() => {
                        setShowAlert(false);
                    }}
                />
            )}
        </Animated.View>
    );
}

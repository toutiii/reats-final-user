import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    FlatList,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import all_constants from "../constants";
import OrderFlatlistItem from "../components/OrderFlatlistItem";
import HorizontalLine from "../components/HorizontalLine";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function OrdersFlatlist(props) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const queryFilter = props.route.params.filter;
    const [
        isFetchingData,
        setIsFetchingData
    ] = useState(true);
    const [
        data,
        setData
    ] = useState([
    ]);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    async function fetchDataFromBackend() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-orders/?status=${queryFilter}`,
            "GET",
            access,
        );

        const itemsWithOrderInfo = result.data.flatMap((order) =>
            order.items.map((item) => {
                const isDish = !!item.dish;
                const itemData = isDish
                    ? item.dish
                    : item.drink;

                return {
                    ...item,
                    ...order, // Add global order info
                    items: undefined, // Remove 'items' to prevent duplication
                    order_id: order.id, // Rename order's 'id' to 'order_id'
                    item_id: itemData.id, // Move item's 'id' to root level as 'id'
                    isDish, // Flag to indicate if it's a dish or drink
                    randomKey: Math.random(),
                };
            }),
        );

        console.log(result.data);
        console.log("\n\nitemsWithOrderInfo: ", itemsWithOrderInfo);
        setData(itemsWithOrderInfo);
    }

    useEffect(() => {
        if (isFetchingData) {
            fadeOut();
            fetchDataFromBackend();
            setIsFetchingData(false);
            fadeIn();
        }
    }, [
        isFetchingData
    ]);

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: "white",
                opacity: fadeAnim,
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.randomKey.toString()}
                    onRefresh={() => {
                        setIsFetchingData(true);
                    }}
                    refreshing={isFetchingData}
                    ItemSeparatorComponent={
                        <HorizontalLine
                            width={"80%"}
                            line_color={"tomato"}
                            margin_left={"10%"}
                        />
                    }
                    ListEmptyComponent={
                        <View
                            style={{
                                marginTop: "5%",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                {all_constants.pending_orders_view.no_pending_orders}
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View
                            style={{
                                alignItems: "center",
                                margin: "4%",
                            }}
                        >
                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate("OrderDetailView", {
                                        item: item,
                                    });
                                }}
                                style={{ flex: 1, alignItems: "center", width: "90%" }}
                                underlayColor={all_constants.colors.inputBorderColor}
                            >
                                <OrderFlatlistItem
                                    itemName={item.dish
                                        ? item.dish.name
                                        : item.drink.name}
                                    itemQuantity={
                                        item.dish
                                            ? item.dish_quantity
                                            : item.drink_quantity
                                    }
                                    itemPrice={item.dish
                                        ? item.dish.price
                                        : item.drink.price}
                                    itemPhoto={item.dish
                                        ? item.dish.photo
                                        : item.drink.photo}
                                    isItemADrink={!item.isDish}
                                    itemOrderDate={item.created}
                                    itemStatus={item.status}
                                />
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
        </Animated.View>
    );
}

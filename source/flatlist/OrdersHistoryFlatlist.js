import React from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function OrdersHistoryFlatList({ ...props }) {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const [
        isFetchingData,
        setIsFetchingData
    ] = React.useState(true);
    const [
        data,
        setData
    ] = React.useState([
    ]);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    async function fetchDataFromBackend() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-orders-history/`,
            "GET",
            access,
        );

        setData(result.data);
        console.log(result.data);
    }

    React.useEffect(() => {
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
            style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                {isFetchingData && <ActivityIndicator size="large" color="tomato" />}
                <FlatList
                    data={data}
                    onRefresh={() => {
                        setIsFetchingData(true);
                    }}
                    refreshing={isFetchingData}
                    ListEmptyComponent={
                        <View
                            style={{
                                alignItems: "center",
                                marginTop: "5%",
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history
                                        .no_results
                                }
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles_order.order_button_container}>
                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate("HistoryOrderDetailView", {
                                        item: item,
                                    });
                                }}
                                style={{ flex: 1 }}
                                underlayColor={all_constants.colors.inputBorderColor}
                            >
                                <Order
                                    order_amount={item.order_amount}
                                    order_number={item.id}
                                    order_status={item.status}
                                    order_date={item.created}
                                    order_final_state_date={item.modified}
                                    dishes_number={item.items.length}
                                ></Order>
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
        </Animated.View>
    );
}

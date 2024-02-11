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
import Item from "../components/Item";
import { callBackEnd } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/common_helpers.js";
import { apiBaseUrl, port } from "../env";

export default function SearchDishFlatList({ ...props }) {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const queryFilter = props.route.params.filter;
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

    React.useEffect(() => {
        if (isFetchingData) {
            setData(null);
            fadeOut();
            setTimeout(() => {
                async function fetchDataFromBackend() {
                    let url = `${apiBaseUrl}:${port}/api/v1/customers-dishes/?sort=${queryFilter}`;
                    let access = await getItemFromSecureStore("accessToken");
                    const results = await callBackEnd(new FormData(), url, "GET", access);

                    setData(results.data);
                }
                fetchDataFromBackend();
                setIsFetchingData(false);
                fadeIn();
            }, 500);
        }
    }, [
        isFetchingData
    ]);

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
        >
            {isFetchingData && (
                <View
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        marginTop: "5%",
                    }}
                >
                    <ActivityIndicator size="large" color="tomato" />
                </View>
            )}

            {!isFetchingData && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                    }}
                >
                    <FlatList
                        data={data}
                        onRefresh={() => {
                            setIsFetchingData(true);
                        }}
                        refreshing={isFetchingData}
                        ItemSeparatorComponent={
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#C8C8C8",
                                    height: 2.5,
                                    marginLeft: "10%",
                                    marginRight: "10%",
                                }}
                            />
                        }
                        ListEmptyComponent={
                            <View
                                style={{
                                    alignItems: "center",
                                    marginTop: "5%",
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    {all_constants.search.no_dishes_found}
                                </Text>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <View style={styles_order.order_button_container}>
                                <TouchableHighlight
                                    onPress={() => {
                                        props.navigation.navigate("SearchItemDetailView", {
                                            item: item,
                                        });
                                    }}
                                    style={{ flex: 1 }}
                                    underlayColor={all_constants.colors.inputBorderColor}
                                >
                                    <Item
                                        key={item.id}
                                        photo={item.photo}
                                        name={item.name}
                                        rating={item.rating
                                            ? item.rating
                                            : "-/-"}
                                        price={item.price + all_constants.currency_symbol}
                                        is_enabled={item.is_enabled}
                                        onPress={item.onPress}
                                    />
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                </View>
            )}
        </Animated.View>
    );
}

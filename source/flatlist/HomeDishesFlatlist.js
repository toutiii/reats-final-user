import React from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    TouchableHighlight,
    View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Dish from "../components/Dish.js";
import { getDishes } from "../helpers/dish_helpers.js";


export default function HomeDishesFlatlist({ ...props }) {
    const queryFilter = props.route.params.filter;
    const [data, setData] = React.useState([]);
    const [isFetchingData, setIsFetchingData] = React.useState(true);

    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        if (data !== null) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const updateSearchingStatus = () => {
        setIsFetchingData(!isFetchingData);
    };

    React.useEffect(() => {
        if (isFetchingData) {
            setData(null);
            fadeOut();
            setTimeout(() => {
                async function fetchDataFromBackend() {
                    let results = {};
                    if (queryFilter === "new") {
                        results = await getDishes();
                    } else {
                        results = await getDishes();
                    }

                    setData(results.data);
                }
                fetchDataFromBackend();
                updateSearchingStatus();
                setIsFetchingData(false);
            }, 500);
        }
    }, [isFetchingData]);

    fadeIn();

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
                {isFetchingData ? (
                    <ActivityIndicator size="large" color="tomato" />
                ) : (
                    <FlatList
                        data={data}
                        onRefresh={() => {
                            setIsFetchingData(true);
                        }}
                        refreshing={isFetchingData}
                        renderItem={({ item }) => (
                            <View style={styles_order.order_button_container}>
                                <TouchableHighlight
                                    onPress={() => {
                                        props.navigation.navigate("SearchItemDetailView", {
                                            item: item,
                                        });
                                    }}
                                    style={{ flex: 1, alignItems: "center" }}
                                    underlayColor={all_constants.colors.inputBorderColor}
                                >
                                    <Dish
                                        key={item.id}
                                        dish_photo={item.photo}
                                        dish_name={item.dish_name}
                                        dish_category={item.dish_category}
                                        dish_rating={item.dish_rating}
                                        dish_price={item.dish_price + all_constants.currency_symbol}
                                        dish_description={item.dish_description}
                                        dish_country={item.dish_country}
                                    />
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                )}
            </View>
        </Animated.View>
    );
}

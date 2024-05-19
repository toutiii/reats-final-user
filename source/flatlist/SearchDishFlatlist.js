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
import { Searchbar } from "react-native-paper";
import SearchFilterModal from "../modals/SearchFilterModal.js";
import { callBackEnd } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/common_helpers.js";
import { apiBaseUrl, port } from "../env";

export default function SearchDishFlatList({ ...props }) {
    const [
        isSearchFilterModalVisible,
        setSearchFilterModalVisible
    ] =
    React.useState(false);

    const [
        countryFilter,
        setCountryFilter
    ] = React.useState(null);

    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const [
        isFetchingData,
        setIsFetchingData
    ] = React.useState(false);

    const [
        data,
        setData
    ] = React.useState([
    ]);

    const [
        runSearchByTextInput,
        setRunSearchByTextInput
    ] = React.useState(false);

    const [
        oneSearchHasBeenRun,
        setOneSearchHasBeenRun
    ] = React.useState(false);

    const toggleSearchFilterModal = () => {
        setSearchFilterModalVisible(!isSearchFilterModalVisible);
    };

    const [
        searchQuery,
        setSearchQuery
    ] = React.useState("");

    const [
        searchURL,
        setSearchURL
    ] = React.useState("");

    const minLengthToTriggerSearch = 3;
    const maxInputLength = 100;
    const delaySearch = 2000;

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

    const onChangeSearch = (query) => {
        console.log(query);
        if (query.length === 0) {
            setSearchQuery("");
        }

        if (query.length > 0 && query.length <= maxInputLength) {
            setSearchQuery(query.replace("  ", ""));
        }

        if (
            query.replace("  ", "").replace(" ", "").length >=
      minLengthToTriggerSearch
        ) {
            setRunSearchByTextInput(true);
        }
    };

    React.useEffect(() => {
        if (isFetchingData) {
            fadeOut();
            setTimeout(() => {
                async function fetchDataFromBackend() {
                    console.log(searchURL);
                    const access = await getItemFromSecureStore("accessToken");
                    const results = await callBackEnd(
                        new FormData(),
                        searchURL,
                        "GET",
                        access,
                    );
                    console.log(results);
                    setData(results.data);
                }
                fetchDataFromBackend();
                setIsFetchingData(false);
                resetFilters();
                setRunSearchByTextInput(false);
                setOneSearchHasBeenRun(true);
                setSearchURL("");
                fadeIn();
            }, 200);
        }
    }, [
        searchURL
    ]);

    React.useEffect(() => {
        if (runSearchByTextInput) {
            const delayDebounceFn = setTimeout(() => {
                setIsFetchingData(true);
                buildSearchUrl();
            }, delaySearch);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [
        searchQuery
    ]);

    const onPressFilter = () => {
        toggleSearchFilterModal();

        if (countryFilter !== null) {
            console.log(searchQuery);
            setIsFetchingData(true);
            buildSearchUrl();
        }
    };

    const buildSearchUrl = () => {
        let queryParams = "";
        let baseURL = `${apiBaseUrl}:${port}/api/v1/customers-dishes/?`;

        if (searchQuery.length >= minLengthToTriggerSearch) {
            queryParams += `name=${searchQuery}`;
        }

        if (countryFilter !== null) {
            queryParams += `&country=${countryFilter}`;
        }

        let localSearchURL = baseURL + queryParams;
        localSearchURL = localSearchURL.replace("?&", "?");
        setSearchURL(localSearchURL);
    };

    const resetFilters = () => {
        setCountryFilter(null);
    };

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
        >
            {isSearchFilterModalVisible && (
                <SearchFilterModal
                    isModalVisible={isSearchFilterModalVisible}
                    enableCountryFilter={true}
                    setCountryFilter={setCountryFilter}
                    toggleModal={toggleSearchFilterModal}
                    onPressFilter={onPressFilter}
                    onPressClear={resetFilters}
                />
            )}

            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                }}
            >
                <View style={{ flex: 4 }}>
                    <Searchbar
                        placeholder={all_constants.search_bar.placeholder}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                {/* <View  // Uncomment this section when we'll need some filters
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableRipple
                        onPress={toggleSearchFilterModal}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Image
                            source={require("../images/filtre.png")}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableRipple>
                </View> */}
            </View>

            {!oneSearchHasBeenRun && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        alignItems: "center",
                        marginTop: "5%",
                    }}
                >
                    <Text
                        style={{ fontSize: 16, textAlign: "center", fontStyle: "italic" }}
                    >
                        {all_constants.search_bar.search_bar_dishes}
                    </Text>
                </View>
            )}

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

            {oneSearchHasBeenRun && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                    }}
                >
                    <FlatList
                        data={data}
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

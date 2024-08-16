import React from "react";
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import styles_dropdown_for_dishes_search from "../styles/styles-dropdown-for-dishes-search.js";
import all_constants from "../constants";
import Item from "../components/Item";
import { TouchableRipple } from "react-native-paper";
import SearchFilterModal from "../modals/SearchFilterModal.js";
import { callBackEnd } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/common_helpers.js";
import { apiBaseUrl, port } from "../env";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { buildReadableAddress } from "../helpers/toolbox";
import CustomButton from "../components/CustomButton";
import CustomAlert from "../components/CustomAlert";

export default function SearchDishFlatList({ ...props }) {
    const [
        isSearchFilterModalVisible,
        setSearchFilterModalVisible
    ] =
    React.useState(false);

    const [
        countryNameFilter,
        setCountryNameFilter
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
        oneSearchHasBeenRun,
        setOneSearchHasBeenRun
    ] = React.useState(false);

    const toggleSearchFilterModal = () => {
        setSearchFilterModalVisible(!isSearchFilterModalVisible);
    };

    const [
        searchURL,
        setSearchURL
    ] = React.useState("");

    const [
        addressesData,
        setAddressesData
    ] = React.useState([
    ]);

    const [
        dishNameFilter,
        setDishNameFilter
    ] = React.useState(null);

    const [
        addressValue,
        setAddressValue
    ] = React.useState(null);

    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);

    const [
        checked,
        setChecked
    ] = React.useState("now");

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

    const resetFilters = () => {
        setDishNameFilter(null);
        setCountryNameFilter(null);
        setChecked("now");
    };

    async function getCustomersAddresses() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-addresses/`,
            "GET",
            access,
        );
        console.log("result: ", result);
        let readableAddresses = [
        ];
        for (let i = 0; i < result.data.length; i++) {
            readableAddresses.push(buildReadableAddress(result.data[i]));
        }
        let addressesDataForDropdown = [
        ];
        for (let i = 0; i < readableAddresses.length; i++) {
            addressesDataForDropdown.push({
                label: readableAddresses[i],
                value: result.data[i].id,
            });
        }
        setAddressesData(addressesDataForDropdown);
        console.log("addressesData: ", addressesDataForDropdown);
    }

    React.useEffect(() => {
        console.log("Fetching customer addresses...");
        getCustomersAddresses();
    }, [
    ]);

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
                setOneSearchHasBeenRun(true);
                setSearchURL("");
                fadeIn();
            }, 200);
        }
    }, [
        isFetchingData
    ]);

    const onPressSearchButton = () => {
        if (addressValue === null) {
            setShowAlert(true);
            return;
        }
        setSearchFilterModalVisible(false);
        buildSearchUrl();
        setIsFetchingData(true);
    };

    const buildSearchUrl = () => {
        let queryParams = "";
        let baseURL = `${apiBaseUrl}:${port}/api/v1/customers-dishes/?`;

        if (dishNameFilter !== null) {
            queryParams += `name=${dishNameFilter}`;
        }

        if (countryNameFilter !== null) {
            queryParams += `&country=${countryNameFilter}`;
        }

        if (addressValue !== null) {
            queryParams += `&search_address_id=${addressValue}`;
        }

        if (checked !== null) {
            queryParams += `&delivery_mode=${checked}`;
        }

        let localSearchURL = baseURL + queryParams;

        localSearchURL = localSearchURL.replace("?&", "?");

        console.log("localSearchURL: ", localSearchURL);

        setSearchURL(localSearchURL);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios"
                ? "padding"
                : "height"}
        >
            <Animated.View
                style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
            >
                {showAlert && (
                    <CustomAlert
                        show={showAlert}
                        title={all_constants.search.alert.title}
                        message={all_constants.search.alert.message}
                        confirmButtonColor="red"
                        onConfirmPressed={() => {
                            setShowAlert(false);
                        }}
                    />
                )}

                {isSearchFilterModalVisible && (
                    <SearchFilterModal
                        isModalVisible={isSearchFilterModalVisible}
                        checked={checked}
                        setChecked={setChecked}
                        setDishNameFilter={setDishNameFilter}
                        dishNameFilter={dishNameFilter}
                        countryNameFilter={countryNameFilter}
                        setCountryNameFilter={setCountryNameFilter}
                        searchURL={searchURL}
                        onPressSearchButton={onPressSearchButton}
                        onPressClear={resetFilters}
                    />
                )}

                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Dropdown
                            style={styles_dropdown_for_dishes_search.dropdown}
                            placeholderStyle={
                                styles_dropdown_for_dishes_search.placeholderStyle
                            }
                            selectedTextStyle={
                                styles_dropdown_for_dishes_search.selectedTextStyle
                            }
                            inputSearchStyle={
                                styles_dropdown_for_dishes_search.inputSearchStyle
                            }
                            iconStyle={styles_dropdown_for_dishes_search.iconStyle}
                            data={addressesData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={all_constants.search.address.placeholder}
                            searchPlaceholder={
                                all_constants.search.address.search_placeholder
                            }
                            value={addressValue}
                            onChange={(item) => {
                                setAddressValue(item.value);
                            }}
                            renderLeftIcon={() => (
                                <MaterialCommunityIcons
                                    style={styles_dropdown_for_dishes_search.icon}
                                    color="black"
                                    name="google-maps"
                                    size={20}
                                />
                            )}
                        />
                    </View>

                    <View
                        style={{
                            flex: 2,
                            flexDirection: "row",
                            backgroundColor: "white",
                            marginLeft: "2%",
                            marginRight: "2%",
                            borderBottomWidth: 1,
                            borderBottomColor: "tomato",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ flex: 4 }}>
                            <CustomButton
                                label={all_constants.search.button.label.search_dishes}
                                backgroundColor="tomato"
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={17}
                                button_width="100%"
                                label_color="white"
                                onPress={onPressSearchButton}
                            />
                        </View>
                        {addressValue !== null && (
                            <View
                                style={{
                                    flex: 1,
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
                            </View>
                        )}
                    </View>
                </View>

                {!oneSearchHasBeenRun && (
                    <View
                        style={{
                            flex: 3,
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
                            flex: 1,
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
                            flex: 3,
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
        </KeyboardAvoidingView>
    );
}

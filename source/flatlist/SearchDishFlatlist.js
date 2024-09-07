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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { buildReadableAddress } from "../helpers/toolbox";
import CustomButton from "../components/CustomButton";
import CustomAlert from "../components/CustomAlert";
import { getGlobalCookerID } from "../helpers/toolbox.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchDishFlatList({ ...props }) {
    const [
        cookerID,
        setCookerID, // eslint-disable-line no-unused-vars
    ] = React.useState(null);

    async function getCookerIDFromAsyncStorage() {
        const cookerIDValue = await getGlobalCookerID();
        setCookerID(cookerIDValue);
        console.log("cookerIDValue: ", cookerIDValue);
    }

    getCookerIDFromAsyncStorage();

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
        showAlertMissingAddress,
        setShowAlertMissingAddress
    ] =
    React.useState(false);

    const [
        showAlertMissingDeliveryMode,
        setShowAlertMissingDeliveryMode
    ] =
    React.useState(false);

    const [
        deliveryModeValue,
        setDeliveryModeValue
    ] = React.useState(null);

    const deliveryModeData = [
        {
            label: all_constants.search.delivery_mode.now,
            value: all_constants.search.delivery_mode.original_now_name,
        },
        {
            label: all_constants.search.delivery_mode.scheduled,
            value: all_constants.search.delivery_mode.original_scheduled_name,
        },
    ];

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
        if (addressValue !== null) {
            if (cookerID !== null) {
                console.log("cookerID: ", cookerID);
                console.log("Filtering by cookerID", cookerID);
                buildSearchUrl();
                setIsFetchingData(true);
            } else {
                setTimeout(() => {
                    console.log("cookerID is null");
                    console.log("Filtering by default");
                    buildSearchUrl();
                    setIsFetchingData(true);
                }, 500);
            }
        }
    }, [
        cookerID
    ]);

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

    const onPressSearchButton = async () => {
        if (addressValue === null) {
            setShowAlertMissingAddress(true);
            return;
        }

        if (deliveryModeValue === null) {
            setShowAlertMissingDeliveryMode(true);
            return;
        }
        setSearchFilterModalVisible(false);
        buildSearchUrl();
        setIsFetchingData(true);
    };

    const buildSearchUrl = () => {
        console.log("cookerID: ", cookerID);
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

        if (deliveryModeValue !== null) {
            queryParams += `&delivery_mode=${deliveryModeValue}`;
        }

        queryParams += `&cooker_id=${cookerID}`;

        let localSearchURL = baseURL + queryParams;

        localSearchURL = localSearchURL.replace("?&", "?");

        console.log("localSearchURL: ", localSearchURL);

        setSearchURL(localSearchURL);
    };

    const addToStorage = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log("Storing delivery mode with key: ", key);
            console.log("Storing delivery mode with value: ", jsonValue);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
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
                <FlatList
                    ListHeaderComponent={
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                            }}
                        >
                            {showAlertMissingAddress && (
                                <CustomAlert
                                    show={showAlertMissingAddress}
                                    title={all_constants.search.alert.title}
                                    message={all_constants.search.alert.missing_address_message}
                                    confirmButtonColor="red"
                                    onConfirmPressed={() => {
                                        setShowAlertMissingAddress(false);
                                    }}
                                />
                            )}

                            {showAlertMissingDeliveryMode && (
                                <CustomAlert
                                    show={showAlertMissingDeliveryMode}
                                    title={all_constants.search.alert.title}
                                    message={
                                        all_constants.search.alert.missing_delivery_mode_message
                                    }
                                    confirmButtonColor="red"
                                    onConfirmPressed={() => {
                                        setShowAlertMissingDeliveryMode(false);
                                    }}
                                />
                            )}

                            {isSearchFilterModalVisible && (
                                <SearchFilterModal
                                    isModalVisible={isSearchFilterModalVisible}
                                    setDishNameFilter={setDishNameFilter}
                                    dishNameFilter={dishNameFilter}
                                    countryNameFilter={countryNameFilter}
                                    setCountryNameFilter={setCountryNameFilter}
                                    searchURL={searchURL}
                                    onPressSearchButton={onPressSearchButton}
                                    onPressClear={resetFilters}
                                />
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
                                        addToStorage("address_id", item.value);
                                        addToStorage("full_delivery_address", item.label);
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
                                    data={deliveryModeData}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={
                                        all_constants.search.delivery_mode.delivery_mode_placeholder
                                    }
                                    value={deliveryModeValue}
                                    onChange={(item) => {
                                        setDeliveryModeValue(item.value);
                                        addToStorage("delivery_mode", item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <MaterialIcons
                                            style={styles_dropdown_for_dishes_search.icon}
                                            color="black"
                                            name="delivery-dining"
                                            size={20}
                                        />
                                    )}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: "white",
                                    marginLeft: "2%",
                                    marginRight: "2%",
                                    marginTop: "2%",
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
                            <View
                                style={{
                                    marginTop: "5%",
                                    marginLeft: "5%",
                                    marginRight: "5%",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "tomato",
                                }}
                            ></View>
                        </View>
                    }
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
                                {oneSearchHasBeenRun
                                    ? all_constants.search.no_dishes_found
                                    : ""}
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
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

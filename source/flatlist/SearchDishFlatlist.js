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
import {
    cleanCurrentOrderState,
    getAllCartItems,
    removeAllCartItems,
    removeGlobalCookerID,
} from "../helpers/toolbox.js";

export default function SearchDishFlatList({ ...props }) {
    const [
        cookerID,
        setCookerID
    ] = React.useState(null);

    async function getCookerIDFromAsyncStorage() {
        const cookerIDValue = await getGlobalCookerID();
        setCookerID(cookerIDValue);
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
        showAlertUpdateDeliveryAddress,
        setShowAlertUpdateDeliveryAddress
    ] =
    React.useState(false);

    const [
        showAlertUpdateDeliveryMode,
        setShowAlertUpdateDeliveryMode
    ] =
    React.useState(false);

    const [
        deliveryModeValue,
        setDeliveryModeValue
    ] = React.useState(null);

    const [
        tempDeliveryMode,
        setTempDeliveryMode
    ] = React.useState(null);

    const [
        tempAddressValue,
        setTempAddressValue
    ] = React.useState(null);

    const [
        tempAddressLabel,
        setTempAddressLabel
    ] = React.useState(null);

    const [
        showEmptyAddressDataAlert,
        setShowEmptyAddressDataAlert
    ] =
    React.useState(false);

    const [
        refreshKey,
        setRefreshKey
    ] = React.useState(0); // Add a refresh state

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

    React.useEffect(() => {
        cleanCurrentOrderState();
    }, [
    ]);

    async function getCustomersAddresses() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-addresses/`,
            "GET",
            access,
            false,
            null,
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
                        false,
                        null,
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
            }, 1000);
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

    const onPressCloseButton = () => {
        setSearchFilterModalVisible(false);
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
            console.log(`Storing ${key} with value ${value}`);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const updateDeliveryMode = async () => {
        const result = await removeAllCartItems();
        const resultCookerID = await removeGlobalCookerID();
        console.log("Remove global cooker ID: ", resultCookerID);
        console.log("Remove all items from cart: ", result);
        setDeliveryModeValue(tempDeliveryMode);
        await addToStorage("delivery_mode", tempDeliveryMode);
    };

    const updateDeliveryAddress = async () => {
        const result = await removeAllCartItems();
        const resultCookerID = await removeGlobalCookerID();
        console.log("Remove global cooker ID: ", resultCookerID);
        console.log("Remove all items from cart: ", result);
        setAddressValue(tempAddressValue);
        await addToStorage("address_id", tempAddressValue);
        await addToStorage("full_delivery_address", tempAddressLabel);
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
                {isFetchingData ? (
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
                ) : (
                    <FlatList
                        ListHeaderComponent={
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "white",
                                }}
                            >
                                {showEmptyAddressDataAlert && (
                                    <CustomAlert
                                        show={showEmptyAddressDataAlert}
                                        title={all_constants.search.alert.warning_title}
                                        message={
                                            all_constants.search.alert
                                                .no_delivery_address_alert_message
                                        }
                                        confirmButtonColor="green"
                                        onConfirmPressed={() => {
                                            setShowEmptyAddressDataAlert(false);
                                            props.navigation.openDrawer();
                                        }}
                                    />
                                )}

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

                                {showAlertUpdateDeliveryMode && (
                                    <CustomAlert
                                        show={showAlertUpdateDeliveryMode}
                                        title={all_constants.search.alert.warning_title}
                                        message={
                                            all_constants.search.alert.delivery_mode_change_warning
                                        }
                                        confirmButtonColor="green"
                                        cancelButtonColor="red"
                                        cancelText={all_constants.search.alert.button.label.no}
                                        confirmText={all_constants.search.alert.button.label.yes}
                                        showCancelButton={true}
                                        onConfirmPressed={async () => {
                                            setShowAlertUpdateDeliveryMode(false);
                                            await updateDeliveryMode();
                                        }}
                                        onCancelPressed={() => {
                                            setShowAlertUpdateDeliveryMode(false);
                                        }}
                                    />
                                )}

                                {showAlertUpdateDeliveryAddress && (
                                    <CustomAlert
                                        show={showAlertUpdateDeliveryAddress}
                                        title={all_constants.search.alert.warning_title}
                                        message={
                                            all_constants.search.alert.delivery_address_change_warning
                                        }
                                        confirmButtonColor="green"
                                        cancelButtonColor="red"
                                        cancelText={all_constants.search.alert.button.label.no}
                                        confirmText={all_constants.search.alert.button.label.yes}
                                        showCancelButton={true}
                                        onConfirmPressed={async () => {
                                            setShowAlertUpdateDeliveryAddress(false);
                                            await updateDeliveryAddress();
                                        }}
                                        onCancelPressed={() => {
                                            setShowAlertUpdateDeliveryAddress(false);
                                            setRefreshKey((prevKey) => prevKey + 1);
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
                                        onPressCloseButton={onPressCloseButton}
                                        onPressClear={resetFilters}
                                    />
                                )}

                                {addressesData.length === 0 && (
                                    <TouchableHighlight
                                        onPress={() => {
                                            setShowEmptyAddressDataAlert(true);
                                        }}
                                        underlayColor="white"
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row",
                                                marginLeft: "4%",
                                                marginRight: "4%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <MaterialIcons
                                                    style={styles_dropdown_for_dishes_search.icon}
                                                    color="red"
                                                    name="warning"
                                                    size={35}
                                                />
                                            </View>
                                            <View style={{ flex: 5 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontStyle: "italic",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {all_constants.search.alert.no_delivery_address_set}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}

                                {addressesData.length > 0 && (
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <Dropdown
                                            key={refreshKey} // Use the refreshKey to trigger re-render
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
                                            onChange={async (item) => {
                                                const cartResults = await getAllCartItems();
                                                if (
                                                    cartResults.data.length > 0 &&
                          addressValue !== item.value
                                                ) {
                                                    setTempAddressValue(item.value);
                                                    setTempAddressLabel(item.label);
                                                    setShowAlertUpdateDeliveryAddress(true);
                                                } else {
                                                    setAddressValue(item.value);
                                                    await addToStorage("address_id", item.value);
                                                    await addToStorage(
                                                        "full_delivery_address",
                                                        item.label,
                                                    );
                                                }
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
                                        data={deliveryModeData}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={
                                            all_constants.search.delivery_mode
                                                .delivery_mode_placeholder
                                        }
                                        value={deliveryModeValue}
                                        onChange={async (item) => {
                                            const cartResults = await getAllCartItems();
                                            if (
                                                cartResults.data.length > 0 &&
                        deliveryModeValue !== item.value
                                            ) {
                                                setTempDeliveryMode(item.value);
                                                setShowAlertUpdateDeliveryMode(true);
                                            } else {
                                                setDeliveryModeValue(item.value);
                                                await addToStorage("delivery_mode", item.value);
                                            }
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
                                    {oneSearchHasBeenRun && data.length === 0
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
                                        acceptance_rate={item.cooker.acceptance_rate}
                                        onPress={item.onPress}
                                    />
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                )}
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

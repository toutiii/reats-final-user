import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    ToastAndroid,
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
    ] = useState(null);

    async function getCookerIDFromAsyncStorage() {
        const cookerIDValue = await getGlobalCookerID();
        setCookerID(cookerIDValue);
    }

    useEffect(() => {
        getCookerIDFromAsyncStorage();
    }, []);

    const [
        isSearchFilterModalVisible,
        setSearchFilterModalVisible
    ] = useState(false);

    // État pour le filtre de pays (utilisé dans SearchFilterModal)
    const [countryNameFilter, setCountryNameFilter] = useState("");

    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const [
        isFetchingData,
        setIsFetchingData
    ] = useState(false);

    const [
        data,
        setData
    ] = useState([]);

    const [
        oneSearchHasBeenRun,
        setOneSearchHasBeenRun
    ] = useState(false);

    const toggleSearchFilterModal = () => {
        setSearchFilterModalVisible(!isSearchFilterModalVisible);
    };

    const [
        searchURL,
        setSearchURL
    ] = useState("");

    const [
        addressesData,
        setAddressesData
    ] = useState([]);

    const [
        dishNameFilter,
        setDishNameFilter
    ] = useState(null);

    const [
        addressValue,
        setAddressValue
    ] = useState(null);

    const [
        deliveryModeValue,
        setDeliveryModeValue
    ] = useState(null);

    const [
        tempDeliveryMode,
        setTempDeliveryMode
    ] = useState(null);

    const [
        tempAddressValue,
        setTempAddressValue
    ] = useState(null);

    const [
        tempAddressLabel,
        setTempAddressLabel
    ] = useState(null);

    const [
        refreshKey,
        setRefreshKey
    ] = useState(0);

    const showMessage = (title, message, onConfirm = null, onCancel = null, confirmText = "OK", cancelText = null) => {
        if (Platform.OS === "android") {
            if (onCancel) {
                Alert.alert(
                    title,
                    message,
                    [
                        {
                            text: cancelText || all_constants.messages.cancel,
                            onPress: onCancel,
                            style: "cancel"
                        },
                        {
                            text: confirmText || "OK",
                            onPress: onConfirm || (() => {})
                        }
                    ]
                );
            } else {
                ToastAndroid.show(message || title, ToastAndroid.SHORT);
                if (onConfirm) {
                    setTimeout(onConfirm, 1000);
                }
            }
        } else {
            const buttons = [];

            if (cancelText && onCancel) {
                buttons.push({
                    text: cancelText,
                    onPress: onCancel,
                    style: "cancel"
                });
            }

            buttons.push({
                text: confirmText || "OK",
                onPress: onConfirm || (() => {})
            });

            Alert.alert(
                title,
                message,
                buttons
            );
        }
    };

    const addToStorage = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const updateDeliveryMode = async () => {
        await removeAllCartItems();
        await cleanCurrentOrderState();
        await removeGlobalCookerID();
        setCookerID(null);
        setDeliveryModeValue(tempDeliveryMode);
        await addToStorage("delivery_mode", tempDeliveryMode);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const updateDeliveryAddress = async () => {
        await removeAllCartItems();
        await cleanCurrentOrderState();
        await removeGlobalCookerID();
        setCookerID(null);
        setAddressValue(tempAddressValue);
        await addToStorage("address_id", tempAddressValue);
        await addToStorage("full_delivery_address", tempAddressLabel);
        setRefreshKey((prevKey) => prevKey + 1);
    };

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

    // Fonction pour réinitialiser les filtres
    const resetFilters = () => {
        setDishNameFilter(null);
        // countryNameFilter est utilisé dans SearchFilterModal
        setCountryNameFilter("");
    };

    useEffect(() => {
        cleanCurrentOrderState();
    }, [
        // Pas de dépendances
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
        let readableAddresses = [];
        for (let i = 0; i < result.data.length; i++) {
            readableAddresses.push(buildReadableAddress(result.data[i]));
        }
        let addressesDataForDropdown = [];
        for (let i = 0; i < readableAddresses.length; i++) {
            addressesDataForDropdown.push({
                label: readableAddresses[i],
                value: result.data[i].id,
            });
        }
        setAddressesData(addressesDataForDropdown);
        console.log("addressesData: ", addressesDataForDropdown);
    }

    useEffect(() => {
        if (addressValue !== null) {
            if (cookerID !== null) {
                console.log("Filtering by cookerID", cookerID);
                setTimeout(() => {
                    buildSearchUrl();
                    onPressSearchButton();
                }, 500);
            }
        }
    }, [
        cookerID,
        addressValue
    ]);

    useEffect(() => {
        console.log("Fetching customer addresses...");
        getCustomersAddresses();
    }, []);

    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
        try {
            const access = await getItemFromSecureStore("accessToken");
            const results = await callBackEnd(
                new FormData(),
                searchURL,
                "GET",
                access,
                false,
                null
            );
            setData(results.data);
            setOneSearchHasBeenRun(true);
            setIsFetchingData(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsFetchingData(false);
        }
    };

    useEffect(() => {
        if (isFetchingData) {
            console.log("Fetching data...");
            fadeOut();
            fetchData();
        } else {
            console.log("Not fetching data...");
            setTimeout(() => {
                fadeIn();
            }, 1000);
        }
    }, [
        isFetchingData,
        searchURL
    ]);

    const onPressSearchButton = async () => {
        if (addressValue === null) {
            showMessage(all_constants.search.alert.title, all_constants.search.alert.missing_address_message);
            return;
        }

        if (deliveryModeValue === null) {
            showMessage(all_constants.search.alert.title, all_constants.search.alert.missing_delivery_mode_message);
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

        if (addressValue !== null) {
            queryParams += `&search_address_id=${addressValue}`;
        }

        if (deliveryModeValue !== null) {
            queryParams += `&delivery_mode=${deliveryModeValue}`;
        }

        queryParams += `&cooker_id=${cookerID}`;

        let localSearchURL = baseURL + queryParams;

        localSearchURL = localSearchURL.replace("?&", "?");

        setSearchURL(localSearchURL);
    };

    const handleAddressChange = (value, label) => {
        const cartResults = getAllCartItems();
        if (cartResults.data.length > 0 && addressValue !== value) {
            setTempAddressValue(value);
            setTempAddressLabel(label);
            showMessage(
                all_constants.search.alert.warning_title,
                all_constants.search.alert.delivery_address_change_warning,
                async () => {
                    await updateDeliveryAddress();
                },
                () => {
                    setRefreshKey((prevKey) => prevKey + 1);
                },
                all_constants.search.alert.button.label.yes,
                all_constants.search.alert.button.label.no
            );
        } else {
            setAddressValue(value);
            addToStorage("address_id", value);
            addToStorage("full_delivery_address", label);
        }
    };

    const handleDeliveryModeChange = (value) => {
        const cartResults = getAllCartItems();
        if (cartResults.data.length > 0 && deliveryModeValue !== value) {
            setTempDeliveryMode(value);
            showMessage(
                all_constants.search.alert.warning_title,
                all_constants.search.alert.delivery_mode_change_warning,
                async () => {
                    await updateDeliveryMode();
                },
                () => {},
                all_constants.search.alert.button.label.yes,
                all_constants.search.alert.button.label.no
            );
        } else {
            setDeliveryModeValue(value);
            addToStorage("delivery_mode", value);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios"
                ? "padding"
                : "height"
            }
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
                                {isSearchFilterModalVisible && (
                                    <SearchFilterModal
                                        isModalVisible={isSearchFilterModalVisible}
                                        setDishNameFilter={setDishNameFilter}
                                        dishNameFilter={dishNameFilter}
                                        searchURL={searchURL}
                                        onPressSearchButton={onPressSearchButton}
                                        onPressCloseButton={onPressCloseButton}
                                        onPressClear={resetFilters}
                                    />
                                )}

                                {addressesData.length === 0 && (
                                    <TouchableHighlight
                                        onPress={() => {
                                            showMessage(
                                                all_constants.search.alert.title,
                                                all_constants.search.alert.no_address_message
                                            );
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
                                            key={refreshKey}
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
                                            placeholder={
                                                all_constants.search.address.placeholder
                                            }
                                            searchPlaceholder={
                                                all_constants.search.address.search_placeholder
                                            }
                                            value={addressValue}
                                            onChange={(item) => {
                                                handleAddressChange(item.value, item.label);
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
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={
                                            all_constants.search.delivery_mode.delivery_mode_placeholder
                                        }
                                        searchPlaceholder={
                                            "Rechercher un mode de livraison"
                                        }
                                        value={deliveryModeValue}
                                        onChange={(item) => {
                                            handleDeliveryModeChange(item.value);
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
                                        : ""
                                    }
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

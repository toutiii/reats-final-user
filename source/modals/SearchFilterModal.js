import React from "react";
import Modal from "react-native-modal";
import { Button, Platform, ScrollView, Text, View } from "react-native";
import all_constants from "../constants";
import { getItemFromSecureStore } from "../helpers/common_helpers.js";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import { Dropdown } from "react-native-element-dropdown";
import styles_dropdown_for_dishes_search from "../styles/styles-dropdown-for-dishes-search.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

export default function SearchFilterModal(props) {
    const [
        keyFilterComponent1,
        setKeyFilterComponent1
    ] = React.useState(0);

    const [
        keyFilterComponent2,
        setKeyFilterComponent2
    ] = React.useState(1);

    const [
        countriesData,
        setCountriesData
    ] = React.useState([
    ]);

    async function getCountriesData() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-dishes-countries/`,
            "GET",
            access,
        );
        console.log("result: ", result);
        let countries = [
        ];
        for (let i = 0; i < result.data.length; i++) {
            countries.push(result.data[i]);
        }
        let addressesDataForDropdown = [
        ];
        for (let i = 0; i < countries.length; i++) {
            addressesDataForDropdown.push({
                label: countries[i],
                value: countries[i],
            });
        }
        setCountriesData(addressesDataForDropdown);
        console.log("addressesData: ", addressesDataForDropdown);
    }

    React.useEffect(() => {
        console.log("Fetching countries data...");
        getCountriesData();
    }, [
    ]);

    return (
        <View
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios"
                ? "padding"
                : "height"}
        >
            <Modal
                isVisible={props.isModalVisible}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                avoidKeyboard={true}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: "white",
                        padding: "5%",
                    }}
                >
                    <View style={{ flex: 10 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "tomato",
                                }}
                            >
                                <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                                    {all_constants.search_modal.dish_name_filter_label}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 3,
                                    justifyContent: "center",
                                }}
                            >
                                <TextInput
                                    placeholder={
                                        all_constants.search_modal.dish_name_filter_placeholder
                                    }
                                    onChangeText={(val) => props.setDishNameFilter(val)}
                                    value={props.dishNameFilter}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "tomato",
                                }}
                            >
                                <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                                    {all_constants.search_modal.dish_country_filter_label}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 3,
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
                                    data={countriesData}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={
                                        all_constants.search_modal.dish_country_filter_placeholder
                                    }
                                    searchPlaceholder={
                                        all_constants.search_modal.dish_country_filter_placeholder
                                    }
                                    value={props.countryNameFilter}
                                    onChange={(item) => {
                                        props.setCountryNameFilter(item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <MaterialCommunityIcons
                                            style={styles_dropdown_for_dishes_search.icon}
                                            color="black"
                                            name="flag-outline"
                                            size={20}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 10 }}></View>
                    <View style={{ flex: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Button
                                color="green"
                                title={all_constants.search_modal.default_button_label}
                                onPress={() => {
                                    props.onPressSearchButton();
                                }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                color="red"
                                title={all_constants.search_modal.clear_filter_button_label}
                                onPress={() => {
                                    props.onPressClear();
                                    setKeyFilterComponent1(keyFilterComponent1 + 1);
                                    setKeyFilterComponent2(keyFilterComponent2 + 1);
                                }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                color="darkgrey"
                                title={all_constants.search_modal.close_filter_button_label}
                                onPress={() => {
                                    props.onPressCloseButton();
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}

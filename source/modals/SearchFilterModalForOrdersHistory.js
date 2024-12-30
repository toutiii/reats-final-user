import React from "react";
import Modal from "react-native-modal";
import { Button, Platform, View } from "react-native";
import {
    MultipleSelectList,
    SelectList,
} from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import all_constants from "../constants";

export default function SearchFilterModalForOrdersHistory(props) {
    const activeFilterData = [
        { key: true, value: "ACTIFS" },
        { key: false, value: "INACTIFS" },
    ];
    const orderStateFilterData = [
        {
            key: all_constants.drawercontent.drawer_item.orders_history
                .original_status.delivered,
            value: all_constants.search_modal.order_date_filter.delivered,
        },
        {
            key: all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_customer,
            value: all_constants.search_modal.order_date_filter.cancelled_by_customer,
        },
        {
            key: all_constants.drawercontent.drawer_item.orders_history
                .original_status.cancelled_by_cooker,
            value: all_constants.search_modal.order_date_filter.cancelled_by_cooker,
        },
    ];

    const dishCategoriesData = [
        { key: "starter", value: "Entrée" },
        { key: "dish", value: "Plat principal" },
        { key: "dessert", value: "Dessert" },
    ];

    const datePickerMode = "startDate";
    const [
        keyMultipleSelectOrderStateFilter,
        setKeyMultipleSelectOrderStateFilter,
    ] = React.useState(0);

    const [
        keyMultipleSelectActiveFilter,
        setKeyMultipleSelectActiveFilter
    ] =
    React.useState(1);
    const [
        show,
        setShow
    ] = React.useState(false);
    const isStartDate = React.useRef(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        isStartDate.current
            ? props.pickStartDate(currentDate)
            : props.pickEndDate(currentDate);
    };

    const showAndroidMode = () => {
    // Below is the recommended way to open picker on android in the docs.
        DateTimePickerAndroid.open({
            value: isStartDate.current
                ? props.startDate === null
                    ? new Date()
                    : props.startDate
                : props.endDate === null
                    ? new Date()
                    : props.endDate,
            onChange,
            mode: datePickerMode,
            is24Hour: true,
        });
    };

    const showDatepicker = (boolValue) => {
        if (boolValue) {
            isStartDate.current = true;
        } else {
            isStartDate.current = false;
        }
        if (Platform.OS === "android") {
            showAndroidMode();
        } else {
            setShow(true);
        }
    };

    const renderDateTimePicker = () => {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={isStartDate.current
                    ? props.startDate
                    : props.endDate}
                mode={datePickerMode}
                is24Hour={true}
                onChange={onChange}
            />
        );
    };

    return (
        <Modal
            isVisible={props.isModalVisible}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
        >
            <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                <View style={{ flex: 7 }}>
                    {props.enableActiveFilter && (
                        <SelectList
                            key={keyMultipleSelectActiveFilter}
                            setSelected={(val) => props.stateSearchData(val)}
                            data={activeFilterData}
                            save="key"
                            placeholder={all_constants.search_modal.state_item}
                        />
                    )}
                    {props.enableOrderStateFilter && (
                        <SelectList
                            key={keyMultipleSelectOrderStateFilter}
                            setSelected={(val) => props.stateOrderData(val)}
                            data={orderStateFilterData}
                            save="key"
                            placeholder={all_constants.search_modal.state_order}
                        />
                    )}

                    {props.enableDishCategories && (
                        <MultipleSelectList
                            key={keyMultipleSelectOrderStateFilter}
                            setSelected={(val) => props.dishCategoriesData(val)}
                            data={dishCategoriesData}
                            save="key"
                            placeholder={all_constants.search_modal.dish_categories}
                        />
                    )}

                    {props.enableStartDateFilter && (
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 4 }}>
                                <TextInput
                                    editable={false}
                                    placeholder={all_constants.search_modal.start_date}
                                    mode="outlined"
                                    value={
                                        props.startDate === null
                                            ? all_constants.search_modal.start_date
                                            : format(props.startDate, "dd/LL/yyyy")
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableRipple
                                    onPress={() => {
                                        showDatepicker(true);
                                    }}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                >
                                    <MaterialCommunityIcons
                                        name="calendar"
                                        color={"black"}
                                        size={35}
                                    />
                                </TouchableRipple>
                            </View>
                        </View>
                    )}

                    {props.enableEndDateFilter && (
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 4 }}>
                                <TextInput
                                    editable={false}
                                    placeholder={all_constants.search_modal.end_date}
                                    mode="outlined"
                                    value={
                                        props.endDate === null
                                            ? all_constants.search_modal.end_date
                                            : format(props.endDate, "dd/LL/yyyy")
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableRipple
                                    onPress={() => {
                                        showDatepicker(false);
                                    }}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                >
                                    <MaterialCommunityIcons
                                        name="calendar"
                                        color={"black"}
                                        size={35}
                                    />
                                </TouchableRipple>
                            </View>
                        </View>
                    )}

                    <View style={{ flex: 1 }}>{show && renderDateTimePicker()}</View>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        color="green"
                        title={all_constants.search_modal.default_button_label}
                        onPress={() => {
                            props.onPressFilter();
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        color="red"
                        title={all_constants.search_modal.clear_filter_button_label}
                        onPress={() => {
                            props.onPressClear();
                            setKeyMultipleSelectActiveFilter(
                                keyMultipleSelectActiveFilter + 1,
                            );
                            setKeyMultipleSelectOrderStateFilter(
                                keyMultipleSelectOrderStateFilter + 1,
                            );
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        color="darkgrey"
                        title={all_constants.search_modal.close_filter_button_label}
                        onPress={() => {
                            props.toggleModal();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

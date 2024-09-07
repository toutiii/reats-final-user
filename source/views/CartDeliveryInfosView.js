import React from "react";
import { TextInput, TouchableHighlight, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import all_constants from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import { formatDateToFrench } from "../helpers/toolbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartDeliveryInfosView({ ...props }) {
    const [
        addressID,
        setAddressID
    ] = React.useState(null);

    const [
        deliveryDate,
        setDeliveryDate
    ] = React.useState("");

    const [
        originalDeliveryDate,
        setOriginalDeliveryDate
    ] = React.useState("");

    const [
        deliveryTime,
        setDeliveryTime
    ] = React.useState("");

    const [
        showDateMode,
        setShowDateMode
    ] = React.useState(false);

    const [
        deliveryAddress,
        setDeliveryAddress
    ] = React.useState(null);

    const [
        showTimeMode,
        setShowTimeMode
    ] = React.useState(false);

    const [
        showCustomAlert,
        setShowCustomAlert
    ] = React.useState(false);

    const [
        showPastTimeCustomAlert,
        setShowPastTimeCustomAlert
    ] =
    React.useState(false);

    const [
        showNotEditableAddressAlert,
        setShowNotEditableAddressAlert
    ] =
    React.useState(false);

    const [
        showAlertMissingDeliveryInfos,
        setShowAlertMissingDeliveryInfos
    ] =
    React.useState(false);

    const onChangeDate = (event, selectedDate) => {
        console.log("event: ", event);
        console.log("selectedDate: ", selectedDate);

        const currentDate = selectedDate;
        setShowDateMode(false);
        setOriginalDeliveryDate(currentDate.toLocaleDateString("en-US"));
        setDeliveryDate(formatDateToFrench(currentDate));
    };

    React.useEffect(() => {
        const fetchAddress = async () => {
            const address = await AsyncStorage.getItem("full_delivery_address");
            const addressID = await AsyncStorage.getItem("address_id");
            setDeliveryAddress(JSON.parse(address));
            setAddressID(JSON.parse(addressID));
        };
        fetchAddress();
    }, [
    ]);

    const onChangeTime = (event, selectedTime) => {
        console.log("event: ", event);
        console.log("selectedTime: ", selectedTime);
        setShowTimeMode(false);

        const currentDate = selectedTime;
        console.log("currentDate: ", currentDate);
        const date = new Date(currentDate);
        const hours = date.getHours();
        console.log("hours: ", hours);

        if (hours < 8 || hours > 22) {
            setShowCustomAlert(true);
            setDeliveryTime("");
            return;
        }
        const minutes = date.getMinutes();
        console.log("minutes: ", minutes);

        minutes < 10
            ? setDeliveryTime(`${hours}:0${minutes}`)
            : setDeliveryTime(`${hours}:${minutes}`);
    };

    const navigateToCartSummary = () => {
        if (deliveryDate.length === 0 || deliveryTime.length === 0) {
            setShowAlertMissingDeliveryInfos(true);
            return;
        }

        props.navigation.navigate("CartSummaryView", {
            deliveryDate: deliveryDate,
            originalDeliveryDate: originalDeliveryDate,
            deliveryTime: deliveryTime,
            deliveryAddress: deliveryAddress,
            addressID: addressID,
            cartItems: props.route.params.cartItems,
        });
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
            }}
        >
            {showCustomAlert && (
                <CustomAlert
                    show={showCustomAlert}
                    title={all_constants.messages.failed.title}
                    message={all_constants.cart.delivery.wrong_delivery_hours}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowCustomAlert(false);
                    }}
                />
            )}
            {showPastTimeCustomAlert && (
                <CustomAlert
                    show={showPastTimeCustomAlert}
                    title={all_constants.messages.failed.title}
                    message={all_constants.cart.delivery.past_time}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowPastTimeCustomAlert(false);
                    }}
                />
            )}
            {showAlertMissingDeliveryInfos && (
                <CustomAlert
                    show={showAlertMissingDeliveryInfos}
                    title={all_constants.messages.failed.title}
                    message={all_constants.cart.delivery.missing_delivery_infos}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowAlertMissingDeliveryInfos(false);
                    }}
                />
            )}
            {showNotEditableAddressAlert && (
                <CustomAlert
                    show={showNotEditableAddressAlert}
                    title={all_constants.cart.alert.title}
                    message={all_constants.cart.alert.not_editable_address_message}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowNotEditableAddressAlert(false);
                    }}
                    style={{
                        flex: 1,
                    }}
                />
            )}
            {showDateMode && (
                <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    minimumDate={new Date(new Date().setDate(new Date().getDate()))}
                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 21))}
                    onChange={onChangeDate}
                />
            )}
            {showTimeMode && (
                <DateTimePicker
                    testID="timePicker"
                    value={new Date()}
                    mode={"time"}
                    is24Hour={true}
                    minuteInterval={30}
                    display="spinner"
                    onChange={onChangeTime}
                />
            )}
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowDateMode(true);
                        }}
                        underlayColor={all_constants.colors.inputBorderColor}
                    >
                        <MaterialCommunityIcons
                            name="calendar-outline"
                            color={"tomato"}
                            size={40}
                        />
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flex: 3,
                        marginRight: "5%",
                        borderBottomWidth: 2,
                        borderBottomColor: "tomato",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowDateMode(true);
                        }}
                        underlayColor={all_constants.colors.inputBorderColor}
                    >
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "black",
                            }}
                            value={deliveryDate}
                            editable={false}
                        />
                    </TouchableHighlight>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowTimeMode(true);
                        }}
                        underlayColor={all_constants.colors.inputBorderColor}
                    >
                        <MaterialCommunityIcons
                            name="clock-time-one-outline"
                            color={"tomato"}
                            size={40}
                        />
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flex: 3,
                        marginRight: "5%",
                        borderBottomWidth: 2,
                        borderBottomColor: "tomato",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowTimeMode(true);
                        }}
                        underlayColor={all_constants.colors.inputBorderColor}
                    >
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "black",
                            }}
                            value={deliveryTime}
                            editable={false}
                        />
                    </TouchableHighlight>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowNotEditableAddressAlert(true);
                        }}
                    >
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            color={"darkgrey"}
                            size={40}
                        />
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flex: 3,
                        marginRight: "5%",
                        borderBottomWidth: 2,
                        borderBottomColor: "darkgrey",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            setShowNotEditableAddressAlert(true);
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "darkgrey",
                                fontStyle: "italic",
                            }}
                            value={deliveryAddress}
                            editable={false}
                            multiline={true}
                            numberOfLines={6}
                        />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <CustomButton
                    label={all_constants.cart.go_to_cart_summary}
                    height={50}
                    border_width={3}
                    border_radius={30}
                    font_size={17}
                    backgroundColor={"green"}
                    label_color={"white"}
                    button_width={all_constants.screen.width - 40}
                    onPress={navigateToCartSummary}
                />
            </View>
        </View>
    );
}

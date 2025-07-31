import React from "react";
import { TextInput, TouchableHighlight, View, Alert, ToastAndroid, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import all_constants from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
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

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (title, message) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            Alert.alert(title, message);
        }
    };

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
            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.wrong_delivery_hours);
            setDeliveryTime("");
            return;
        }
        const minutes = date.getMinutes();
        console.log("minutes: ", minutes);

        minutes < 10
            ? setDeliveryTime(`${hours}:0${minutes}`)
            : setDeliveryTime(`${hours}:${minutes}`);
    };

    const isTimeInPast = (deliveryTime) => {
        const currentDate = new Date();

        const [
            hours,
            minutes
        ] = deliveryTime.split(":").map(Number);

        const providedTime = new Date();
        providedTime.setHours(hours);
        providedTime.setMinutes(minutes);
        providedTime.setSeconds(0);
        console.log("providedTime: ", providedTime);
        console.log("currentDate: ", currentDate);
        console.log("providedTime < currentDate: ", providedTime < currentDate);
        return providedTime < currentDate;
    };

    const isTimeAtLeastOneHourInFuture = (deliveryTime) => {
        const currentDate = new Date();

        const currentDatePlusOneHour = new Date(
            currentDate.getTime() + 60 * 60 * 1000,
        );

        const [
            hours,
            minutes
        ] = deliveryTime.split(":").map(Number);

        const providedTime = new Date();
        providedTime.setHours(hours);
        providedTime.setMinutes(minutes);
        providedTime.setSeconds(0);
        console.log("providedTime: ", providedTime);
        console.log("currentDatePlusOneHour: ", currentDatePlusOneHour);
        console.log(
            "providedTime >= currentDatePlusOneHour: ",
            providedTime >= currentDatePlusOneHour,
        );

        return providedTime >= currentDatePlusOneHour;
    };

    const navigateToCartSummary = () => {
        if (deliveryDate.length === 0 || deliveryTime.length === 0) {
            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.missing_delivery_infos);
            return;
        }

        if (isTimeInPast(deliveryTime)) {
            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.past_time);
            return;
        }

        if (!isTimeAtLeastOneHourInFuture(deliveryTime)) {
            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.too_soon);
            return;
        }

        props.navigation.navigate("CartSummaryView", {
            deliveryDate: deliveryDate,
            originalDeliveryDate: originalDeliveryDate,
            deliveryTime: deliveryTime,
            deliveryAddress: deliveryAddress,
            addressID: addressID,
            cartItems: props.route.params.cartItems,
            deliveryMode: props.route.params.deliveryMode,
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
                            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.not_editable_address);
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
                            showMessage(all_constants.messages.failed.title, all_constants.cart.delivery.not_editable_address);
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

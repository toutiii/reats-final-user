import React from "react";
import {
    Button,
    FlatList,
    TextInput,
    TouchableHighlight,
    Text,
    View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import all_constants from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomAlert from "../components/CustomAlert";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import Modal from "react-native-modal";
import AddressItem from "../components/AddressItem";
import CustomButton from "../components/CustomButton";
import { buildReadableAddress, formatDateToFrench } from "../helpers/toolbox";

export default function CartDeliveryInfosView({ ...props }) {
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
    ] = React.useState("");

    const [
        showModal,
        setShowModal
    ] = React.useState(false);

    const [
        addressesData,
        setAddressesData
    ] = React.useState([
    ]);

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
        showAlertMissingDeliveryInfos,
        setShowAlertMissingDeliveryInfos
    ] =
    React.useState(false);

    async function getData() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers-addresses/`,
            "GET",
            access,
        );
        console.log("result: ", result);
        setAddressesData(result.data);
    }

    React.useEffect(() => {
        console.log("Fetching updated customer addresses data...");
        getData();
    }, [
    ]);

    const onChangeDate = (event, selectedDate) => {
        console.log("event: ", event);
        console.log("selectedDate: ", selectedDate);

        const currentDate = selectedDate;
        setShowDateMode(false);
        setOriginalDeliveryDate(currentDate.toLocaleDateString("en-US"));
        setDeliveryDate(formatDateToFrench(currentDate));
    };

    React.useEffect(() => {
        console.log("deliveryDate: ", deliveryDate);
    }, [
        deliveryDate
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
        if (deliveryDate === formatDateToFrench(new Date())) {
            setShowPastTimeCustomAlert(true);
            setDeliveryTime("");
            setDeliveryDate("");
            return;
        }

        if (
            deliveryDate.length === 0 ||
      deliveryTime.length === 0 ||
      deliveryAddress.length === 0
        ) {
            setShowAlertMissingDeliveryInfos(true);
            return;
        }

        props.navigation.navigate("CartSummaryView", {
            deliveryDate: deliveryDate,
            originalDeliveryDate: originalDeliveryDate,
            deliveryTime: deliveryTime,
            deliveryAddress: deliveryAddress,
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
            {showModal && (
                <Modal
                    isVisible={showModal}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "white",
                            justifyContent: "center",
                        }}
                    >
                        <FlatList
                            data={addressesData}
                            ListEmptyComponent={
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: "5%",
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 20, textAlign: "center" }}>
                                            {all_constants.cart.delivery.no_delivery_address}
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1, marginTop: "15%" }}>
                                        <Button
                                            title={all_constants.cart.button.close}
                                            onPress={() => {
                                                setShowModal(false);
                                                props.navigation.goBack(null);
                                            }}
                                        />
                                    </View>
                                </View>
                            }
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
                            renderItem={({ item }) => (
                                <View style={{ flex: 1 }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            setDeliveryAddress(item);
                                            setShowModal(false);
                                        }}
                                        style={{ alignItems: "center", marginTop: "10%" }}
                                        underlayColor={all_constants.colors.inputBorderColor}
                                    >
                                        <View
                                            style={{ flex: 1, alignItems: "center", width: "90%" }}
                                        >
                                            <View style={{ flex: 1, width: "90%" }}>
                                                <AddressItem
                                                    key={item.id}
                                                    street_number={item.street_number}
                                                    street_name={item.street_name}
                                                    address_complement={
                                                        item.address_complement
                                                            ? item.address_complement
                                                            : ""
                                                    }
                                                    postal_code={item.postal_code}
                                                    town={item.town}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    paddingTop: "5%",
                                                    width: "80%",
                                                }}
                                            ></View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            )}
                        />
                    </View>
                </Modal>
            )}
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
            {showDateMode && (
                <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
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
                    <TextInput
                        style={{
                            fontSize: 18,
                            color: "black",
                        }}
                        value={deliveryDate}
                        editable={false}
                    />
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
                    <TextInput
                        style={{
                            fontSize: 18,
                            color: "black",
                        }}
                        value={deliveryTime}
                        editable={false}
                    />
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
                            console.log("showModal: ", showModal);
                            setShowModal(true);
                        }}
                        underlayColor={all_constants.colors.inputBorderColor}
                    >
                        <MaterialCommunityIcons
                            name="map-marker-outline"
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
                    <TextInput
                        style={{
                            fontSize: 18,
                            color: "black",
                        }}
                        value={buildReadableAddress(deliveryAddress)}
                        editable={false}
                        multiline={true}
                        numberOfLines={4}
                    />
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

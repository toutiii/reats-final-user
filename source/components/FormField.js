import React, { useState, useEffect } from "react";
import {
    Image,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import styles_field from "../styles/styles-field";
import all_constants from "../constants";
import RNPickerSelect from "react-native-picker-select";
import { getCategories } from "../helpers/common_helpers";
import CustomImageButton from "../components/CustomImageButton";
import * as ImagePicker from "expo-image-picker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { getDaysOfWeek } from "../helpers/common_helpers";
import CustomButton from "../components/CustomButton";
import FormLabelModal from "../modals/FormLabelModal";
import CustomAlert from "./CustomAlert";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Device from "expo-device";

export default function FormField({ ...props }) {
    const [
        showAlert,
        setStateShowAlert
    ] = useState(false);
    const [
        picUri,
        setPicUri
    ] = useState(null);
    const [
        category,
        setCategory
    ] = useState(null);
    const [
        labelModalState,
        setLabelModalState
    ] = useState(false);
    const [
        date,
        setDate
    ] = useState(new Date());
    const [
        show,
        setShow
    ] = useState(false);
    const [
        mode,
        setMode
    ] = useState("date");
    const [
    // eslint-disable-next-line no-unused-vars
        selected,
        setSelected,
    ] = useState("");

    const showDatepicker = () => {
        showMode("date");
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        if (event.type === "set") {
            props.onChangeText(
                props.fieldName,
                moment(currentDate).format("DD-MM-YYYY"),
            );
        }
    };

    useEffect(() => {
        setPicUri(props.itemObject.photo);
    }, [
        props.itemObject
    ]);
    useEffect(() => {
        setCategory(props.newItem.dish_category);
    }, [
        props.newItem
    ]);
    const options = {
        allowsEditing: true,
        aspect: [
            16,
            9
        ],
        quality: 1,
        base64: false,
    };

    const launchGallery = async () => {
        if (Platform.OS !== "web") {
            const statusObject =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (statusObject.status !== "granted") {
                setStateShowAlert(true);
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({ options });
                if (!result.cancelled) {
                    setPicUri(result.uri);
                    props.newItem["photo"] = result.uri;
                }
            }
        }
    };

    const launchCamera = async () => {
        if (Platform.OS !== "web") {
            const statusObject = await ImagePicker.requestCameraPermissionsAsync();
            if (statusObject.status !== "granted") {
                setStateShowAlert(true);
            } else {
                let result = await ImagePicker.launchCameraAsync({ options });
                if (!result.cancelled) {
                    setPicUri(result.uri);
                    props.newItem["photo"] = result.uri;
                }
            }
        }
    };

    return (
        <View
            style={[
                styles_field.container,
                { padding: props.login || props.reset_password
                    ? "2%"
                    : "10%" },
            ]}
        >
            <View style={styles_field.label}>
                {props.field.fieldIsMandatory
                    ? (
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text style={{ color: "red", fontSize: 22 }}>*</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontStyle: props.field.isReadOnly
                                        ? "italic"
                                        : "normal",
                                }}
                            >
                                {props.field.hideLabel
                                    ? ""
                                    : props.field.label}
                            </Text>
                        </View>
                    )
                    : (
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontStyle: props.field.isReadOnly
                                        ? "italic"
                                        : "normal",
                                }}
                            >
                                {props.field.hideLabel
                                    ? ""
                                    : props.field.label}
                            </Text>
                        </View>
                    )}
                {props.field.labelModal
                    ? (
                        <View style={{ alignItems: "center" }}>
                            <CustomButton
                                label={"?"}
                                backgroundColor="tomato"
                                label_color="white"
                                height={23}
                                button_width={23}
                                border_radius={30}
                                font_size={12}
                                onPress={() => {
                                    setLabelModalState(true);
                                }}
                            />
                        </View>
                    )
                    : (
                        <View></View>
                    )}
            </View>
            {labelModalState
                ? (
                    <FormLabelModal
                        state={true}
                        labelModalText={props.field.labelModalText}
                        onPressCloseModal={() => {
                            setLabelModalState(false);
                        }}
                    />
                )
                : (
                    <View></View>
                )}
            {props.field.type === all_constants.field_type.textinput ||
      props.field.type === all_constants.field_type.textarea
                ? (
                    <View
                        style={[
                            styles_field.textinput_container,
                            {
                                height:
                props.field.type === all_constants.field_type.textarea
                    ? 140
                    : 70,
                            },
                        ]}
                    >
                        <TextInput
                            style={styles_field.textinput}
                            value={props.value}
                            onChangeText={(text) => props.onChangeText(props.fieldName, text)}
                            maxLength={props.field.maxLength}
                            multiline={props.field.type === all_constants.field_type.textarea}
                            numberOfLines={
                                props.field.type === all_constants.field_type.textarea
                                    ? 4
                                    : 1
                            }
                            placeholder={props.field.placeholder}
                            keyboardType={props.field.keyboardNumeric
                                ? "numeric"
                                : "default"}
                            editable={!props.field.isReadOnly}
                            caretHidden={
                                props.field.label.toLowerCase() === "email" &&
              Device.manufacturer.toLowerCase() === "xiaomi"
                            }
                        />
                        {!props.login && !props.reset_password
                            ? (
                                <View>
                                    {props.value
                                        ? (
                                            <Text style={{ fontSize: 14 }}>
                                                {all_constants.remaining_char}
                                                {props.field.maxLength - props.value.length}/
                                                {props.field.maxLength}
                                            </Text>
                                        )
                                        : (
                                            <Text style={{ fontSize: 14 }}>
                                                {all_constants.remaining_char}
                                                {props.field.maxLength}/{props.field.maxLength}
                                            </Text>
                                        )}
                                </View>
                            )
                            : (
                                <View style={{ height: "30%" }}></View>
                            )}
                    </View>
                )
                : (
                    <View></View>
                )}
            {props.field.type === all_constants.field_type.select
                ? (
                    <View style={styles_field.picker_container}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: props.field.placeholder, value: null }}
                            value={category
                                ? category
                                : null}
                            onValueChange={(value) =>
                                props.onChangeText(props.fieldName, value)
                            }
                            items={getCategories("Dish")}
                            textInputProps={{
                                fontSize: props.value
                                    ? 18
                                    : 16,
                                color: props.value
                                    ? "black"
                                    : "gray",
                            }}
                        />
                    </View>
                )
                : (
                    <View></View>
                )}
            {props.field.type === all_constants.field_type.select_picker
                ? (
                    <View style={{ flex: 1 }}>
                        <MultipleSelectList
                            setSelected={setSelected}
                            data={getDaysOfWeek()}
                            boxStyles={styles_field.dropdown_box_container}
                            dropdownStyles={styles_field.dropdown_container}
                            placeholder={
                                props.value === null ||
              !props.value ||
              props.value.length === 0
                                    ? (
                                        <Text style={{ color: "darkgrey" }}>
                                            {props.field.placeholder}
                                        </Text>
                                    )
                                    : (
                                        <Text style={{ color: "black" }}>{props.value}</Text>
                                    )
                            }
                        />
                    </View>
                )
                : (
                    <View></View>
                )}
            {props.field.type === all_constants.field_type.image
                ? (
                    <View style={styles_field.button_container}>
                        <View style={{ flex: 2 }}>
                            {picUri
                                ? (
                                    <Image
                                        source={{ uri: picUri }}
                                        style={{ width: 200, height: 150 }}
                                    />
                                )
                                : (
                                    <View style={styles_field.no_image}>
                                        <Text>PHOTO</Text>
                                    </View>
                                )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles_field.button}>
                                <CustomImageButton
                                    onPress={launchCamera}
                                    uri={
                                        "https://pics.freeicons.io/uploads/icons/png/20607508171555590649-512.png"
                                    }
                                />
                            </View>
                            <View style={styles_field.button}>
                                <CustomImageButton
                                    onPress={launchGallery}
                                    uri={
                                        "https://pics.freeicons.io/uploads/icons/png/6433396501558096324-512.png"
                                    }
                                />
                            </View>
                        </View>
                    </View>
                )
                : (
                    <View></View>
                )}
            {props.field.type === all_constants.field_type.date_picker && (
                <TouchableWithoutFeedback>
                    <TextInput
                        showSoftInputOnFocus={false}
                        onTouchStart={() => showDatepicker()}
                        style={styles_field.textinput}
                        value={props.value
                            ? props.value
                            : null}
                        placeholder={props.field.placeholder}
                    />
                </TouchableWithoutFeedback>
            )}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {showAlert
                ? (
                    <CustomAlert
                        show={showAlert}
                        title={all_constants.permissions.error}
                        message={all_constants.permissions.gallery}
                        confirmButtonColor="red"
                        onConfirmPressed={props.onConfirmPressed}
                    />
                )
                : (
                    <View></View>
                )}
            {props.error
                ? (
                    <CustomAlert
                        show={props.showAlert}
                        title={all_constants.messages.errors.title}
                        message={props.error}
                        confirmButtonColor="red"
                        onConfirmPressed={props.onConfirmPressed}
                    />
                )
                : (
                    <View></View>
                )}
        </View>
    );
}

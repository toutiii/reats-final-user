import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import all_constants from "../constants";
import { validateFields } from "../validators/common_validators";
import FormField from "../components/FormField";
import styles_form from "../styles/styles-form";
import CustomAlert from "../components/CustomAlert";
import { apiKeyBackend } from "../env";

const getInitialErrorsState = (fieldKeys) => {
    const errors_state = {};
    fieldKeys.forEach((key) => {
        errors_state[key] = "";
    });
    return errors_state;
};

export default function Form({ ...props }) {
    const fieldKeys = Object.keys(props.fields);

    const fieldsObject = props.fields;

    const [
        newItem,
        setValues
    ] = useState(props.item);

    //To be sure to reset form initial content when we press on a flatlist item.
    useEffect(() => {
        setValues(props.item);
    }, [
        props.item
    ]);

    const [
    // eslint-disable-next-line no-unused-vars
        errorMessage,
        setErrorMessage,
    ] = useState("");

    const [
        validationErrors,
        setValidationErrors
    ] = useState(
        getInitialErrorsState(fieldKeys),
    );

    const [
        opacity
    ] = useState(new Animated.Value(1));

    const [
        isSubmitting,
        setSubmitting
    ] = useState(false);

    const [
        showAlert,
        setStateShowAlert
    ] = useState(false);

    const [
        noErrorsFound,
        setNoErrorsFound
    ] = useState(true);

    const [
        apiOkResponse,
        setApiOkResponse
    ] = useState(false);

    const [
        wantToGoBack,
        setWantToGoBack
    ] = useState(false);

    const [
        disableState,
        setDisableState
    ] = useState(false);

    const [
        removeState,
        setRemoveState
    ] = useState(false);

    const [
        showAlertCancel,
        setShowAlertCancel
    ] = useState(false);

    const onChangeValue = (key, value) => {
        const newState = { ...newItem, [key]: value };
        setValues(newState);
        if (validationErrors[key]) {
            const newErrors = { ...validationErrors, [key]: "" };
            setValidationErrors(newErrors);
        }
    };

    const fadeOut = () => {
        Animated.timing(opacity, {
            toValue: 0.2,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const fadeIn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const submit = async () => {
        let result = {};
        result.ok = false;
        setSubmitting(true);
        setErrorMessage("");
        setValidationErrors(getInitialErrorsState(fieldKeys, props));
        const errors = validateFields(props.fields, newItem);
        if (Object.keys(errors).length !== 0) {
            setSubmitting(false);
            setStateShowAlert(true);
            setNoErrorsFound(true);
            return setValidationErrors(errors);
        }
        fadeOut();
        try {
            //const userID = await getItemFromSecureStore("userID");
            //const accessToken = await getItemFromSecureStore("accessToken");

            result = await props.action(
                newItem,
                props.url,
                props.method,

                props.useApiKey
                    ? apiKeyBackend
                    : null,
            );
            setApiOkResponse(result.ok);
            fadeIn();
            if (props.afterSubmit === undefined || props.afterSubmit === null) {
                setStateShowAlert(true);
            }
        } catch (e) {
            setErrorMessage(e.message);
            fadeIn();
        }
        setSubmitting(false);

        if (props.afterSubmit) {
            props.afterSubmit(newItem);
        }
    };

    const disableItem = () => {
        setDisableState(true);
        setStateShowAlert(true);
    };

    const removeItem = () => {
        setRemoveState(true);
        setStateShowAlert(true);
    };

    const onPressForgottenPassword = () => {
        props.navigation.goBack();
        setStateShowAlert(false);
    };
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                {showAlertCancel && (
                    <CustomAlert
                        show={showAlertCancel}
                        title={all_constants.custom_alert.form.title}
                        message={all_constants.custom_alert.form.message}
                        confirmButtonColor="green"
                        showCancelButton={true}
                        cancelButtonColor="red"
                        cancelText={all_constants.custom_alert.homeview.cancel_text}
                        onConfirmPressed={() => {
                            setShowAlertCancel(false);
                            props.navigation.goBack();
                        }}
                        onCancelPressed={() => {
                            setShowAlertCancel(false);
                        }}
                    />
                )}
                <View style={styles_form.container}>
                    {isSubmitting && (
                        <View style={styles_form.activityIndicatorContainer}>
                            <ActivityIndicator size="large" color="tomato" />
                        </View>
                    )}
                    {!isSubmitting && noErrorsFound && apiOkResponse && (
                        <CustomAlert
                            show={showAlert}
                            title={all_constants.messages.success.title}
                            confirmButtonColor="green"
                            onConfirmPressed={() => {
                                setStateShowAlert(false);
                            }}
                        />
                    )}
                    {showAlert && wantToGoBack && (
                        <CustomAlert
                            show={showAlert}
                            title={all_constants.custom_alert.form.title}
                            message={all_constants.custom_alert.form.message}
                            confirmButtonColor="green"
                            showCancelButton={true}
                            cancelButtonColor="red"
                            cancelText={all_constants.messages.cancel}
                            onConfirmPressed={() => {
                                setStateShowAlert(false);
                                setWantToGoBack(false);
                                props.navigation.goBack();
                            }}
                            onCancelPressed={() => {
                                setStateShowAlert(false);
                                setWantToGoBack(false);
                            }}
                        />
                    )}
                    {props.third_button_label && showAlert && disableState && (
                        <CustomAlert
                            show={showAlert}
                            title={all_constants.custom_alert.form.title}
                            message={all_constants.custom_alert.form.disable_item_message}
                            confirmButtonColor="green"
                            showCancelButton={true}
                            cancelButtonColor="red"
                            cancelText={all_constants.messages.cancel}
                            onConfirmPressed={() => {
                                setDisableState(false);
                                setStateShowAlert(false);
                                console.log("TO DO !");
                            }}
                            onCancelPressed={() => {
                                setDisableState(false);
                                setStateShowAlert(false);
                            }}
                        />
                    )}
                    {props.fourth_button_label && showAlert && removeState && (
                        <CustomAlert
                            show={showAlert}
                            title={props.alert_title}
                            message={props.alert_message}
                            confirmButtonColor="green"
                            showCancelButton={true}
                            cancelButtonColor="red"
                            cancelText={all_constants.messages.cancel}
                            onConfirmPressed={() => {
                                setRemoveState(false);
                                setStateShowAlert(false);
                                console.log("TO DO REMOVE!");
                            }}
                            onCancelPressed={() => {
                                setRemoveState(false);
                                setStateShowAlert(false);
                            }}
                        />
                    )}
                    {props.reset_password &&
            !isSubmitting &&
            noErrorsFound &&
            apiOkResponse && (
                        <CustomAlert
                            show={showAlert}
                            title={all_constants.messages.success.title}
                            message={all_constants.messages.success.reset_password}
                            confirmButtonColor="green"
                            onConfirmPressed={onPressForgottenPassword}
                        />
                    )}
                    {!isSubmitting &&
            noErrorsFound &&
            !apiOkResponse &&
            !wantToGoBack &&
            !disableState &&
            !removeState && (
                        <CustomAlert
                            show={showAlert}
                            title={all_constants.messages.failed.title}
                            confirmButtonColor="red"
                            onConfirmPressed={() => {
                                setStateShowAlert(false);
                            }}
                        />
                    )}
                    <Animated.View style={{ flex: 1, opacity, width: "100%" }}>
                        {fieldKeys.map((key) => {
                            return (
                                <FormField
                                    key={key}
                                    login={props.login}
                                    reset_password={props.reset_password}
                                    itemObject={props.item}
                                    newItem={newItem}
                                    fieldName={key}
                                    field={fieldsObject[key]}
                                    error={validationErrors[key]}
                                    onChangeText={onChangeValue}
                                    value={newItem[key]}
                                    showAlert={showAlert}
                                    onConfirmPressed={() => {
                                        setStateShowAlert(false);
                                    }}
                                />
                            );
                        })}
                    </Animated.View>
                    <View style={{ flex: 1 }}>
                        <View style={styles_form.submit_button}>
                            <CustomButton
                                label={all_constants.messages.submit}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={18}
                                backgroundColor={"green"}
                                label_color="white"
                                onPress={submit}
                            />
                        </View>
                        {props.login
                            ? (
                                <View style={{ flex: 1 }}>
                                    <View style={styles_form.form_button}>
                                        <CustomButton
                                            label={all_constants.messages.signup}
                                            height={50}
                                            border_width={3}
                                            border_radius={30}
                                            font_size={18}
                                            backgroundColor={"dimgrey"}
                                            label_color="white"
                                            onPress={() => {
                                                props.navigation.navigate("SignupForm");
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                            : (
                                <View style={styles_form.form_button}>
                                    <CustomButton
                                        label={all_constants.messages.cancel}
                                        height={50}
                                        border_width={3}
                                        border_radius={30}
                                        font_size={18}
                                        backgroundColor={"red"}
                                        label_color="white"
                                        onPress={() => {
                                            setShowAlertCancel(true);
                                        }}
                                    />
                                </View>
                            )}
                        {Object.keys(props.item).length !== 0 &&
            !props.is_new_item &&
            props.third_button_label
                            ? (
                                <View style={styles_form.cancel_button}>
                                    <CustomButton
                                        label={props.third_button_label}
                                        height={50}
                                        border_radius={30}
                                        font_size={18}
                                        backgroundColor={"tomato"}
                                        label_color="white"
                                        onPress={disableItem}
                                    />
                                </View>
                            )
                            : (
                                <View></View>
                            )}
                        {Object.keys(props.item).length !== 0 &&
            !props.is_new_item &&
            props.fourth_button_label
                            ? (
                                <View style={styles_form.cancel_button}>
                                    <CustomButton
                                        label={props.fourth_button_label}
                                        height={50}
                                        border_radius={30}
                                        font_size={18}
                                        backgroundColor={"darkgrey"}
                                        label_color="white"
                                        onPress={removeItem}
                                    />
                                </View>
                            )
                            : (
                                <View></View>
                            )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

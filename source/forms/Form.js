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
import {
    deleteItemFromSecureStore,
    getItemFromSecureStore,
} from "../helpers/common_helpers";
import { CommonActions } from "@react-navigation/native";
import { callBackEnd } from "../api/callBackend";

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
        showAlertCancel,
        setShowAlertCancel
    ] = useState(false);

    const [
        showAlertDeleteAccount,
        setShowAlertDeleteAccount
    ] = useState(false);

    const [
        showAlertDeleteAccountSuccess,
        setShowAlertDeleteAccountSuccess
    ] =
    useState(false);

    const [
        showAlertDeleteAddress,
        setShowAlertDeleteAddress
    ] = useState(false);

    const [
        showAlertDeleteAddressFailed,
        setShowAlertDeleteAddressFailed
    ] =
    useState(false);

    const [
        redirectTologinView,
        setRedirectTologinView
    ] = useState(false);

    const [
        forceRefreshData,
        setForceRefreshData
    ] = useState(false);

    const [
        reloadScreen,
        setReloadScreen
    ] = useState(false);

    const resetNavigationStackToLoginView = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: "LoginForm" }
            ],
        });
        props.navigation.dispatch(resetAction);
    };

    useEffect(() => {
        if (redirectTologinView) {
            console.log("Delete account action success, redirecting to LoginView");
            resetNavigationStackToLoginView();
        }
    }, [
        redirectTologinView
    ]);

    const newItemCopy = props.item;

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
            const userID = await getItemFromSecureStore("userID");
            const accessToken = await getItemFromSecureStore("accessToken");
            const apiKey = props.useApiKey
                ? apiKeyBackend
                : null;
            if (props.login) {
                result = await props.action(newItem, props.url, props.method, apiKey);
            } else {
                result = await props.action(
                    newItem,
                    props.url,
                    props.method,
                    props.useItemID
                        ? newItem.id
                        : userID,
                    accessToken,
                    apiKey,
                );
            }

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
            props.afterSubmit(result.ok, newItem);
        }
    };

    const deleteAccountAction = async () => {
        setSubmitting(true);
        setErrorMessage("");
        fadeOut();
        try {
            const userID = await getItemFromSecureStore("userID");
            const accessToken = await getItemFromSecureStore("accessToken");
            const result = await props.action(
                newItem,
                props.url,
                "DELETE",
                userID,
                accessToken,
            );
            result.ok
                ? setShowAlertDeleteAccountSuccess(true)
                : setStateShowAlert(true);

            setApiOkResponse(result.ok);
            fadeIn();
        } catch (e) {
            setErrorMessage(e.message);
            fadeIn();
        }
        setSubmitting(false);
    };

    const deleteAddressAction = async () => {
        setSubmitting(true);
        setErrorMessage("");
        fadeOut();
        try {
            const accessToken = await getItemFromSecureStore("accessToken");
            const result = await props.action(
                newItem,
                props.url,
                "DELETE",
                newItem.id,
                accessToken,
            );
            result.ok
                ? setStateShowAlert(true)
                : setShowAlertDeleteAddressFailed(true);

            if (result.ok) {
                setForceRefreshData(true);
            }

            setApiOkResponse(result.ok);
            fadeIn();
        } catch (e) {
            setErrorMessage(e.message);
            fadeIn();
        }
        setSubmitting(false);
    };

    const getTownFromPostalCode = async (postalCode) => {
        fieldsObject["town"].selectValues.length = 0;
        const townResults = await callBackEnd(
            new FormData(),
            `https://geo.api.gouv.fr/communes?codePostal=${postalCode}`,
            "GET",
        );

        if (townResults.length === 0) {
            console.log("No towns for postal code ", postalCode);
            return;
        }

        for (let i = 0; i < townResults.length; i++) {
            let tempObject = townResults[i];
            fieldsObject["town"].selectValues.push({
                label: tempObject.nom,
                value: tempObject.nom,
            });
        }

        setReloadScreen(true);
        console.log(fieldsObject["town"]);
    };

    useEffect(() => {
        console.log("Reloading screen");
        setReloadScreen(false);
    }, [
        reloadScreen
    ]);

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
                        cancelText={all_constants.custom_alert.cancel_text}
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
                                console.log("New item: ", newItem);
                                console.log("New item copy: ", newItemCopy.current);
                                setStateShowAlert(false);
                                if (
                                    JSON.stringify(newItem) !==
                  JSON.stringify(newItemCopy.current)
                                ) {
                                    if (props.refreshDataStateChanger !== undefined) {
                                        props.refreshDataStateChanger(true);
                                    }
                                }
                                if (forceRefreshData) {
                                    console.log("Force refresh data");
                                    props.refreshDataStateChanger(true);
                                }

                                props.navigation.goBack(null);
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

                    {showAlertDeleteAccount && (
                        <CustomAlert
                            show={showAlertDeleteAccount}
                            title={all_constants.custom_alert.form.delete_account_title}
                            message={all_constants.custom_alert.form.delete_account_message}
                            confirmButtonColor="green"
                            showCancelButton={true}
                            cancelButtonColor="red"
                            confirmText={all_constants.custom_alert.keep_account}
                            cancelText={all_constants.custom_alert.delete_account}
                            onConfirmPressed={() => {
                                setShowAlertDeleteAccount(false);
                            }}
                            onCancelPressed={() => {
                                setShowAlertDeleteAccount(false);
                                deleteAccountAction();
                            }}
                        />
                    )}

                    {showAlertDeleteAccountSuccess && (
                        <CustomAlert
                            show={showAlertDeleteAccountSuccess}
                            title={all_constants.messages.success.title}
                            message={all_constants.custom_alert.form.success}
                            confirmButtonColor="green"
                            cancelText={all_constants.custom_alert.delete_account}
                            onConfirmPressed={() => {
                                deleteItemFromSecureStore("accessToken");
                                deleteItemFromSecureStore("userID");
                                setRedirectTologinView(true);
                                setShowAlertDeleteAccountSuccess(false);
                            }}
                        />
                    )}

                    {showAlertDeleteAddressFailed && (
                        <CustomAlert
                            show={showAlertDeleteAddressFailed}
                            title={all_constants.messages.failed.title}
                            confirmButtonColor="red"
                            onConfirmPressed={() => {
                                setShowAlertDeleteAddressFailed(false);
                                props.navigation.goBack(null);
                            }}
                        />
                    )}

                    {showAlertDeleteAddress && (
                        <CustomAlert
                            show={showAlertDeleteAddress}
                            title={all_constants.custom_alert.form.delete_address_title}
                            message={all_constants.custom_alert.form.delete_address_message}
                            confirmButtonColor="green"
                            showCancelButton={true}
                            cancelButtonColor="red"
                            confirmText={all_constants.messages.cancel}
                            cancelText={all_constants.custom_alert.delete_account}
                            onConfirmPressed={() => {
                                setShowAlertDeleteAddress(false);
                            }}
                            onCancelPressed={() => {
                                setShowAlertDeleteAddress(false);
                                deleteAddressAction();
                            }}
                        />
                    )}

                    {!isSubmitting &&
            noErrorsFound &&
            !apiOkResponse &&
            !wantToGoBack && (
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
                                    getTownFromPostalCode={getTownFromPostalCode}
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
                        {props.deleteAccountButton && (
                            <View style={styles_form.form_button}>
                                <CustomButton
                                    label={props.deleteAccountButtonLabel}
                                    height={50}
                                    border_radius={30}
                                    font_size={18}
                                    backgroundColor={"darkgrey"}
                                    label_color="white"
                                    onPress={() => {
                                        setShowAlertDeleteAccount(true);
                                    }}
                                />
                            </View>
                        )}
                        {newItem.id !== undefined &&
              newItem.town !== undefined &&
              newItem.town !== null &&
              props.showDeleteAddressButton && (
                            <View style={styles_form.form_button}>
                                <CustomButton
                                    label={props.deleteAddressButtonLabel}
                                    height={50}
                                    border_radius={30}
                                    font_size={18}
                                    backgroundColor={"darkgrey"}
                                    label_color="white"
                                    onPress={() => {
                                        setShowAlertDeleteAddress(true);
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View, ToastAndroid, Platform, Alert } from "react-native";
import {
    checkValueIsDefined,
    checkValueNotContainsSpecialChar,
    checkPhoneNumbers,
} from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackendWithFormDataForCustomers } from "../api/callBackend";
import { apiBaseUrl, port } from "../env";

export default function SignupForm({ ...props }) {
    // Nous n'avons plus besoin de stocker l'item car nous le passons directement
    // à la navigation

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (message, isSuccess) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            Alert.alert(
                isSuccess
                    ? all_constants.messages.success.title
                    : all_constants.messages.failed.title,
                message
            );
        }
    };

    const handleResult = (isRequestSuccessful, itemObject) => {
        if (isRequestSuccessful) {
            // Afficher un message de succès
            showMessage(all_constants.messages.success.otp_message_signup, true);
            // Rediriger directement vers OTPView
            props.navigation.navigate("OTPView", { item: itemObject });
        } else {
            // Afficher un message d'erreur
            showMessage("La demande a échoué. Veuillez réessayer.", false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Suppression du CustomAlert */}

            <View style={{ flex: 2 }}>
                <Form
                    action={callBackendWithFormDataForCustomers}
                    useApiKey={true}
                    url={`${apiBaseUrl}:${port}/api/v1/customers/`}
                    method={"POST"}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    item={{
                        firstname: "Toutii",
                        lastname: "N",
                        phone: "0753790506",
                        phone_confirmation: "0753790506",
                    }}
                    fields={{
                        firstname: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.firstname,
                            placeholder: all_constants.placeholders.form.settings.firstname,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar,
                            ],
                            maxLength: all_constants.max_length.form.firstname,
                        },
                        lastname: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.lastname,
                            placeholder: all_constants.placeholders.form.settings.lastname,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar,
                            ],
                            maxLength: all_constants.max_length.form.lastname,
                        },
                        phone: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.phone,
                            placeholder: all_constants.placeholders.form.settings.phone,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                checkNumericFormat
                            ],
                            maxLength: all_constants.max_length.form.phone,
                        },
                        phone_confirmation: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.phone_confirmation,
                            placeholder: all_constants.placeholders.form.settings.phone,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                checkNumericFormat,
                                checkPhoneNumbers,
                            ],
                            maxLength: all_constants.max_length.form.phone,
                        },
                    }}
                />
            </View>
        </View>
    );
}

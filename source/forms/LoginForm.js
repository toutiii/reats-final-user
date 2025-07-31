import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { Text, View, ToastAndroid, Platform, Alert } from "react-native";
import { checkValueIsDefined } from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackEndForAuthentication } from "../api/callBackend";
import { apiBaseUrl, port } from "../env";

export default function LoginForm({ ...props }) {
    // Nous n'avons plus besoin de stocker l'item car nous le passons directement
    // à la navigation

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (message) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            Alert.alert(
                all_constants.messages.success.title,
                message
            );
        }
    };

    const handleResult = (isRequestSuccessful, itemObject) => {
        console.log("isRequestSuccessful: ", isRequestSuccessful);
        if (isRequestSuccessful) {
            // Afficher un message de succès
            showMessage(all_constants.messages.success.otp_message_login);
            // Rediriger directement vers OTPView
            props.navigation.navigate("OTPView", { item: itemObject, auth: true });
        } else {
            // Afficher un message d'erreur
            showMessage("La connexion a échoué. Veuillez réessayer.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Suppression du CustomAlert */}
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    margin: "5%",
                }}
            >
                <Text> LOGO goes here </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Form
                    action={callBackEndForAuthentication}
                    useApiKey={true}
                    url={`${apiBaseUrl}:${port}/api/v1/customers/auth/`}
                    method={"POST"}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    login={true}
                    item={{}}
                    fields={{
                        phone: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.phone,
                            placeholder: all_constants.placeholders.form.settings.phone,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                checkNumericFormat
                            ],
                            maxLength: all_constants.max_length.form.phone,
                            hideLabel: true,
                        },
                    }}
                />
            </View>
        </View>
    );
}

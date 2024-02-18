import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { Text, View } from "react-native";
import { checkValueIsDefined } from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackEndForAuthentication } from "../api/callBackend";
import CustomAlert from "../components/CustomAlert";
import { apiBaseUrl, port } from "../env";

export default function LoginForm({ ...props }) {
    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);
    const [
        item,
        setItem
    ] = React.useState(null);

    const handleResult = (isRequestSuccessful, itemObject) => {
        console.log("isRequestSuccessful: ", isRequestSuccessful);
        setItem(itemObject);
        setShowAlert(true);
    };

    const onPressed = () => {
        setShowAlert(false);
        props.navigation.navigate("OTPView", { item: item, auth: true });
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View>
                <CustomAlert
                    show={showAlert}
                    title={all_constants.messages.success.title}
                    message={all_constants.messages.success.otp_message_login}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        onPressed();
                    }}
                />
            </View>
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

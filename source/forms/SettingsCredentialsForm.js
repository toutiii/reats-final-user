import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import { checkValueIsDefined } from "../validators/common_validators";
import {
    checkEmailFormat,
    checkPasswordFormat,
    checkFormCoherence,
} from "../validators/settingsform_validators";
import { callBackEnd } from "../api/fetch";

export default function SettingsCredentialsForm({ ...props }) {
    const handleResult = async (result) => {
        if (result.ok) {
            props.navigation.goBack(null);
        } else {
            throw new Error("Failed.");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, marginTop: "10%" }}>
                <Form
                    action={callBackEnd}
                    url={all_constants.uri.api.mock}
                    method={"POST"}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    item={props.route.params.item}
                    fields={{
                        email: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.email,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.email,
                            placeholder: all_constants.placeholders.form.settings.email,
                            validators: [
                                checkValueIsDefined,
                                checkEmailFormat
                            ],
                            maxLength: 100,
                        },
                        user_settings_current_password: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.current_password,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.password,
                            placeholder:
                all_constants.placeholders.form.settings
                    .user_settings_current_password,
                            validators: [
                                checkValueIsDefined
                            ],
                            maxLength: 12,
                        },
                        user_settings_new_password: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.new_password,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.password,
                            placeholder:
                all_constants.placeholders.form.settings
                    .user_settings_new_password,
                            validators: [
                                checkPasswordFormat
                            ],
                            maxLength: 12,
                        },
                        user_settings_new_password_confirmation: {
                            type: all_constants.field_type.textinput,
                            label:
                all_constants.label.form.settings.new_password_confirmation,
                            placeholder:
                all_constants.placeholders.form.settings
                    .user_settings_new_password_confirmation,
                            validators: [
                                checkPasswordFormat,
                                checkFormCoherence
                            ],
                            maxLength: 12,
                        },
                    }}
                />
            </View>
        </View>
    );
}

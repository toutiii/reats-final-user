import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
    checkValueIsDefined,
    checkValueNotContainsSpecialChar,
} from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackendWithFormDataForCustomers } from "../api/callBackend";
import { apiBaseUrl, port } from "../env";

export default function SettingsPersonalInformationForm({ ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, marginTop: "10%" }}>
                <Form
                    action={callBackendWithFormDataForCustomers}
                    url={`${apiBaseUrl}:${port}/api/v1/customers/`}
                    method={"PATCH"}
                    navigation={props.navigation}
                    refreshDataStateChanger={props.route.params.refreshDataStateChanger}
                    item={props.route.params.item}
                    fields={{
                        photo: {
                            type: all_constants.field_type.image,
                            label: all_constants.label.form.settings.image,
                        },
                        firstname: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.firstname,
                            placeholder: all_constants.placeholders.form.settings.firstname,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar,
                            ],
                            maxLength: 50,
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
                            maxLength: 50,
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
                            maxLength: 10,
                            isReadOnly: true,
                        },
                    }}
                />
            </View>
        </View>
    );
}

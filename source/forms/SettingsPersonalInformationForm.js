import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
    checkValueIsDefined,
    checkValueNotContainsSpecialChar,
} from "../validators/common_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackEnd } from "../api/fetch";

export default function SettingsPersonalInformationForm({ ...props }) {
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
                            validators: [checkValueIsDefined, checkNumericFormat],
                            maxLength: 10,
                        },
                    }}
                />
            </View>
        </View>
    );
}

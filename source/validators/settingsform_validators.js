import all_constants from "../constants";

export function checkPostalCode(value, fieldLabel) {
    value = value.toString().trim();
    let postalCodeRegex = /^([0-9]{5})$/g;
    if (!value.match(postalCodeRegex)) {
        return (
            all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.global.invalid_postal_code
        );
    }
}

export function checkEmailFormat(value) {
    let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.match(emailRegex)) {
        return all_constants.validators.settings.invalid_email_error;
    }
}

export function checkPasswordFormat(value) {
    let expectedSpecialChar = ["!", "#", "*"];
    let foundSpecialCharCount = 0;
    let foundUppercaseCharCount = 0;
    let foundNumericCount = 0;
    if (typeof value !== "undefined") {
        value = value.trim();
        if (value.length < all_constants.password.min_length) {
            return (
                all_constants.validators.settings.too_short_password_error +
        all_constants.password.min_length +
        all_constants.validators.settings.char
            );
        }
        for (let i = 0; i < expectedSpecialChar.length; i++) {
            if (value.indexOf(expectedSpecialChar[i]) > -1) {
                foundSpecialCharCount++;
            }
        }
        if (foundSpecialCharCount === 0) {
            return (
                all_constants.validators.settings.password_missing_special_chars +
        expectedSpecialChar.join(", ") +
        "."
            );
        }
        for (let i = 0; i < value.length; i++) {
            let char = value.charAt(i);
            if (
                char === char.toUpperCase() &&
        !expectedSpecialChar.includes(char) &&
        !/^\d+$/.test(char)
            ) {
                foundUppercaseCharCount++;
            }
            if (/^\d+$/.test(char)) {
                foundNumericCount++;
            }
        }
        if (foundUppercaseCharCount === 0) {
            return all_constants.validators.settings.password_missing_uppercase;
        }
        if (foundNumericCount === 0) {
            return all_constants.validators.settings.password_missing_digit;
        }
    }
}

export function checkFormCoherence(value, fieldLabel, objectToValidate) {
    let userNewPassword = objectToValidate["user_settings_new_password"];
    let userNewPasswordConfirmation =
    objectToValidate["user_settings_new_password_confirmation"];
    if (
        typeof userNewPassword !== "undefined" ||
    typeof userNewPasswordConfirmation !== "undefined"
    ) {
        if (userNewPassword !== userNewPasswordConfirmation) {
            return all_constants.validators.settings.non_equal_password_error;
        }
    }
}

export function checkNumericFormat(value, fieldLabel) {
    if (typeof value !== "undefined") {
        value = value.toString().trim();
        let regex = null;
        let endMessage = null;
        if (
            fieldLabel.toLowerCase().includes(all_constants.validators.includes.phone)
        ) {
            regex = /^([0-9]{10})$/g;
            endMessage = all_constants.validators.settings.phone_format_error;
        }
        if (!value.match(regex)) {
            return all_constants.validators.global.field + fieldLabel + endMessage;
        }
    }
}

export function checkMaxDishesNumber(value, fieldLabel) {
    value = value.toString().trim();
    let regex = /^([0-9]{1,2})$/g;
    if (!value.match(regex)) {
        return (
            all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.global.invalid_max_dishes_number_format
        );
    }
}

export function checkHourFormat(value, fieldLabel) {
    if (typeof value !== "undefined" && value) {
        value = value.toString().trim();
        let regex = /^([0-9]{1,2})-([0-9]{1,2})$/g;
        let endMessage = null;
        if (
            fieldLabel.toLowerCase().includes(all_constants.validators.includes.noon)
        ) {
            endMessage = all_constants.validators.settings.noon_hours_format_error;
        } else if (
            fieldLabel
                .toLowerCase()
                .includes(all_constants.validators.includes.evening)
        ) {
            endMessage = all_constants.validators.settings.evening_hours_format_error;
        }
        if (!value.match(regex)) {
            return (
                all_constants.validators.global.field +
        fieldLabel +
        all_constants.validators.settings.incorrect +
        endMessage
            );
        }
    }
}

export function checkHourCoherence(value, fieldLabel) {
    if (typeof value !== "undefined") {
        value = value.toString().trim();
        let valueArray = value.split("-");
        let startHour = valueArray[0];
        let endHour = valueArray[1];
        let startMessage =
      all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.settings.incorrect;
        if (startHour === endHour) {
            return (
                startMessage +
        all_constants.validators.settings.identical_start_hours_end_hours_error
            );
        }
        if (startHour > endHour) {
            return (
                startMessage +
        all_constants.validators.settings.start_hour_greater_than_end_hour_error
            );
        }
    }
}

export function checkEmptyDeliveryHours(
    daysArray,
    fieldLabel,
    objectToValidate
) {
    let deliveryHours = null;
    if (
        fieldLabel.toLowerCase().includes(all_constants.validators.includes.day)
    ) {
        deliveryHours = objectToValidate["noon_delivery_hours"];
    } else {
        deliveryHours = objectToValidate["evening_delivery_hours"];
    }
    if (daysArray.length !== 0 && !deliveryHours) {
    // we gave delivery days but no delivery hours
        return (
            all_constants.validators.settings.delivery_days +
      daysArray +
      all_constants.validators.settings.missing_hours_for_delivery_days
        );
    } else if (daysArray.length === 0 && deliveryHours) {
    // we gave delivery hours but no days
        return (
            all_constants.validators.settings.hours_range +
      deliveryHours +
      all_constants.validators.settings.missing_days_for_delivery_hours
        );
    }
}

export function checkGlobalDeliveryCoherence(objectToValidate) {
    let eveningDeliveryHours = objectToValidate["evening_delivery_hours"];
    let noonDeliveryHours = objectToValidate["noon_delivery_hours"];
    if (!eveningDeliveryHours && !noonDeliveryHours) {
        return all_constants.validators.settings.missing_delivery_hours_error;
    }
}

import all_constants from "../constants";

export function validateFields(fields, objectToValidate) {
    const errors = {};
    const fieldNameKeys = Object.keys(fields);
    for (let fieldName of fieldNameKeys) {
        const fieldObject = fields[fieldName];
        const validators = fieldObject.validators;
        const fieldLabel = fieldObject.label;
        const value = objectToValidate[fieldName];
        if (validators && validators.length > 0) {
            const error = validateField(
                validators,
                value,
                fieldLabel,
                objectToValidate,
            );
            if (error) {
                errors[fieldName] = error;
                break;
            }
        }
    }
    return errors;
}

export function validateField(validators, value, fieldLabel, objectToValidate) {
    let error = "";
    for (let validator of validators) {
        if (typeof validator !== "undefined") {
            const validationError = validator(value, fieldLabel, objectToValidate);
            if (validationError) {
                error = validationError;
                break;
            }
        }
    }
    return error;
}

export function checkValueIsDefined(value, fieldLabel) {
    if (typeof value === "undefined" || value === null) {
        return (
            all_constants.validators.global.field +
      fieldLabel.toLowerCase() +
      all_constants.validators.global.is_empty
        );
    } else {
        if (value.toString().length === 0) {
            return (
                all_constants.validators.global.field +
        fieldLabel +
        all_constants.validators.global.is_empty
            );
        }
    }
}

export function checkValueNotContainsSpecialChar(value, fieldLabel) {
    if (typeof value !== "undefined" && value !== null) {
        value = value
            .toString()
            .trim()
            .replace(/ +(?= )/g, "");
        let regex = null;
        if (fieldLabel.toLowerCase().includes("description")) {
            regex =
        /([\u00C0-\u00D6\u00D9-\u00DD\u00E0-\u00F6\u00F9-\u00FFA-Za-z0-9 ',.!])/g;
        }
        if (fieldLabel.toLowerCase().includes("name")) {
            regex =
        /([\u00C0-\u00D6\u00D9-\u00DD\u00E0-\u00F6\u00F9-\u00FFA-Za-z -])/g;
        } else {
            regex =
        /([\u00C0-\u00D6\u00D9-\u00DD\u00E0-\u00F6\u00F9-\u00FFA-Za-z0-9 '&-])/g;
        }
        let rejectedString = value.replace(regex, "");
        if (rejectedString.length !== 0) {
            return (
                all_constants.validators.global.field +
        fieldLabel.toLowerCase() +
        all_constants.validators.global.invalid_char +
        "\"" +
        rejectedString[0] +
        "\""
            );
        }
    }
}

export function valueIsValidPrice(value, fieldLabel) {
    value = value.toString().trim();
    let priceRegex = /^([0-9]{1,2}(\.[0-9]{1,2})?)$/g;
    if (!value.match(priceRegex)) {
        return (
            all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.global.invalid_price
        );
    }
}

export function checkPhoneNumbers(value, fieldLabel, objectToValidate) {
    console.log(value);
    console.log(fieldLabel);
    if (objectToValidate.phone !== objectToValidate.phone_confirmation) {
        return all_constants.validators.global.phone_mismatch;
    }
}

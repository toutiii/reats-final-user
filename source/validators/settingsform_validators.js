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

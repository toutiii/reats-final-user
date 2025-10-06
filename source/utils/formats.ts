import {
    AsYouType,
    CountryCode,
    parsePhoneNumberFromString,
  } from "libphonenumber-js";

  type PhoneNumberFormatResult = {
    isValid: boolean;
    formattedNumber: string | null;
    countryCallingCode: string | null;
    completeInternationalNumber: string | null;
  };

  export const formatPhoneNumber = (
    phoneNumber: string,
    countryCode: CountryCode,
  ): PhoneNumberFormatResult => {
    try {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode);
      const isTyping = new AsYouType(countryCode).input(phoneNumber);

      if (parsedNumber) {
        return {
          isValid: parsedNumber.isValid(),
          formattedNumber: parsedNumber.formatInternational(),
          countryCallingCode: parsedNumber.countryCallingCode,
          completeInternationalNumber: parsedNumber.formatInternational(), // Nouvelle propriété ajoutée
        };
      } else {
        return {
          isValid: false,
          formattedNumber: isTyping,
          countryCallingCode: isTyping,
          completeInternationalNumber: isTyping,
        };
      }
    } catch (error) {
      return {
        isValid: false,
        formattedNumber: null,
        countryCallingCode: null,
        completeInternationalNumber: null,
      };
    }
  };
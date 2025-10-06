import { CountryCode } from "libphonenumber-js";

export type ModeType = "light" | "dark" | "system";

export interface ICountry {
  calling_codes: number[];
  emoji: string;
  value: string;
  key: CountryCode;
}
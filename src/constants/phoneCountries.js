/**
 * Supported phone countries for auth forms.
 * Add a new entry here to allow another country code / national format.
 *
 * @typedef {{
 *   code: string;
 *   name: string;
 *   dialCode: string;
 *   nationalNumberLength: number;
 *   nationalNumberPattern?: RegExp;
 * }} PhoneCountry
 */

/** @type {PhoneCountry[]} */
export const PHONE_COUNTRIES = [
  {
    code: "BH",
    name: "Bahrain",
    dialCode: "+973",
    nationalNumberLength: 8,
  },
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    nationalNumberLength: 10,
    nationalNumberPattern: /^[6-9]\d{9}$/,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    nationalNumberLength: 10,
  },
];

export const PHONE_VALIDATION_MESSAGE = "Enter a valid mobile number";

export const normalizeMobileNumber = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, "") : value;

const isValidNationalNumber = (nationalPart, country) => {
  if (!/^\d+$/.test(nationalPart)) return false;

  if (country.nationalNumberPattern) {
    return country.nationalNumberPattern.test(nationalPart);
  }

  return nationalPart.length === country.nationalNumberLength;
};

const matchesCountry = (normalized, country) => {
  const nationalPart = normalized.startsWith(country.dialCode)
    ? normalized.slice(country.dialCode.length)
    : normalized;

  return isValidNationalNumber(nationalPart, country);
};

export const isValidPhoneNumber = (value) => {
  const normalized = normalizeMobileNumber(value);
  if (!normalized) return false;

  return PHONE_COUNTRIES.some((country) => matchesCountry(normalized, country));
};

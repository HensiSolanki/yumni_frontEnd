import * as yup from "yup";

const mobileRegex = /^(\+966\s?)?\d{10}$/;

const authFields = {
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  mobileNumber: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .matches(mobileRegex, "Enter a valid mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
};

export const loginSchema = yup.object(authFields);

export const registerSchema = yup.object(authFields);

const singleOtpDigit = yup
  .string()
  .required("Required")
  .matches(/^\d$/, "Enter one digit");

export const otpSchema = yup.object({
  digit1: singleOtpDigit,
  digit2: singleOtpDigit,
  digit3: singleOtpDigit,
  digit4: singleOtpDigit,
  digit5: singleOtpDigit,
  digit6: singleOtpDigit,
});

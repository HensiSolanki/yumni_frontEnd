import * as yup from "yup";

const mobileRegex = /^(\+966\s?)?\d{10}$/;

const fullNameField = yup
  .string()
  .trim()
  .required("Full name is required")
  .min(2, "Full name must be at least 2 characters");

const mobileNumberField = yup
  .string()
  .trim()
  .required("Mobile number is required")
  .matches(mobileRegex, "Enter a valid mobile number");

const passwordField = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters");

export const loginSchema = yup.object({
  mobileNumber: mobileNumberField,
  password: passwordField,
});

export const registerSchema = yup.object({
  fullName: fullNameField,
  mobileNumber: mobileNumberField,
  password: passwordField,
});

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

export const forgotPasswordSchema = yup.object({
  mobileNumber: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

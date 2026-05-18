import * as yup from "yup";

const mobileRegex = /^(\+966\s?)?0?5\d{8}$/;

export const loginSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  mobileNumber: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .matches(mobileRegex, "Enter a valid Saudi mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Enter the 6-digit code"),
});

export const registerSchema = loginSchema;

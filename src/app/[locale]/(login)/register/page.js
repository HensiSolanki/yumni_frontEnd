"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { FormProvider } from "@/components/hook-form";
import { registerSchema, otpSchema } from "@/schemas/authSchema";
import { RegisterUser, verifyAuthOtp } from "@/redux/auth/services";
import { Link, useRouter } from "@/i18n/navigation";
import { persistAuthSession } from "@/utils/authSession";
import { getApiErrorMessage, getApiPayload, isHttpOk } from "@/utils/apiResponse";
import { normalizeMobile } from "@/utils/normalizeMobile";
import {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  ErrorText,
  FooterLink,
  Input,
  Label,
  LoginCard,
  LoginShell,
  PrimaryButton,
  SecondaryButton,
  Subtitle,
  Title,
} from "../login/style";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState("credentials");
  const [pendingMobile, setPendingMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const credentialsMethods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { fullName: "", mobileNumber: "", password: "" },
  });

  const otpMethods = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onRegister = async (data) => {
    setIsSubmitting(true);
    const payload = {
      fullName: data.fullName.trim(),
      mobileNumber: normalizeMobile(data.mobileNumber),
      password: data.password,
    };
    const res = await RegisterUser(payload);
    setIsSubmitting(false);

    if (isHttpOk(res)) {
      setPendingMobile(payload.mobileNumber);
      setStep("otp");
      const otpHint = getApiPayload(res)?.otp;
      toast.success(
        otpHint
          ? `OTP sent. Dev code: ${otpHint}`
          : "OTP sent. Check your phone to verify.",
      );
      return;
    }

    toast.error(getApiErrorMessage(res, "Registration failed"));
  };

  const onVerifyOtp = async (data) => {
    setIsSubmitting(true);
    const res = await verifyAuthOtp({
      mobileNumber: pendingMobile,
      otp: data.otp,
    });
    setIsSubmitting(false);

    if (isHttpOk(res)) {
      persistAuthSession(getApiPayload(res));
      toast.success("Account verified. Welcome!");
      router.push("/");
      return;
    }

    toast.error(getApiErrorMessage(res, "Invalid or expired OTP"));
  };

  return (
    <>
      <Header />
      <LoginShell>
        <LoginCard>
          <BrandRow>
            <BrandIcon>🏠</BrandIcon>
            <div>
              <BrandName>Property 973</BrandName>
              <BrandSubtext>Create your account</BrandSubtext>
            </div>
          </BrandRow>

          {step === "credentials" ? (
            <>
              <Title>Create account</Title>
              <Subtitle>Register with your mobile number</Subtitle>

              <FormProvider
                methods={credentialsMethods}
                onSubmit={credentialsMethods.handleSubmit(onRegister)}
              >
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...credentialsMethods.register("fullName")}
                />
                {credentialsMethods.formState.errors.fullName && (
                  <ErrorText>
                    {credentialsMethods.formState.errors.fullName.message}
                  </ErrorText>
                )}

                <Label htmlFor="mobileNumber">Mobile number</Label>
                <Input
                  id="mobileNumber"
                  placeholder="+966 5xxxxxxxx"
                  {...credentialsMethods.register("mobileNumber")}
                />
                {credentialsMethods.formState.errors.mobileNumber && (
                  <ErrorText>
                    {credentialsMethods.formState.errors.mobileNumber.message}
                  </ErrorText>
                )}

                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...credentialsMethods.register("password")}
                />
                {credentialsMethods.formState.errors.password && (
                  <ErrorText>
                    {credentialsMethods.formState.errors.password.message}
                  </ErrorText>
                )}

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering…" : "Register & send OTP"}
                </PrimaryButton>
              </FormProvider>

              <Link href="/login" passHref legacyBehavior>
                <FooterLink as="span">Already have an account? Sign in</FooterLink>
              </Link>
            </>
          ) : (
            <>
              <Title>Verify your number</Title>
              <Subtitle>Enter the 6-digit code sent to {pendingMobile}</Subtitle>

              <FormProvider
                methods={otpMethods}
                onSubmit={otpMethods.handleSubmit(onVerifyOtp)}
              >
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  maxLength={6}
                  {...otpMethods.register("otp")}
                />
                {otpMethods.formState.errors.otp && (
                  <ErrorText>{otpMethods.formState.errors.otp.message}</ErrorText>
                )}

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Verifying…" : "Verify account"}
                </PrimaryButton>
              </FormProvider>

              <SecondaryButton
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep("credentials")}
              >
                Back
              </SecondaryButton>
            </>
          )}
        </LoginCard>
      </LoginShell>
      <Footer />
    </>
  );
}

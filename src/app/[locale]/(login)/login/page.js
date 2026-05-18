"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import { FormProvider } from "@/components/hook-form";
import { loginSchema, otpSchema } from "@/schemas/authSchema";
import {
  loginUser,
  sendAuthOtp,
  verifyAuthOtp,
} from "@/redux/auth/services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { Link, useRouter } from "@/i18n/navigation";
import { persistAuthSession } from "@/utils/authSession";
import { getApiErrorMessage, getApiPayload, isHttpOk } from "@/utils/apiResponse";
import { normalizeMobile } from "@/utils/normalizeMobile";
import {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  FooterLink,
  Input,
  Label,
  LoginCard,
  LoginShell,
  PrimaryButton,
  SecondaryButton,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "./style";

const LoginPage = () => {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("/");
  const [step, setStep] = useState("credentials");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("redirect");
    if (next) setRedirectTo(next);
  }, []);
  const [pendingMobile, setPendingMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const credentialsMethods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      password: "",
    },
  });

  const otpMethods = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const finishLogin = (apiData) => {
    persistAuthSession(apiData);
    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  const buildCredentialsPayload = (data) => ({
    fullName: data.fullName.trim(),
    mobileNumber: normalizeMobile(data.mobileNumber),
    password: data.password,
  });

  const onSendOtp = async (data) => {
    setIsSubmitting(true);
    const payload = buildCredentialsPayload(data);
    const res = await sendAuthOtp(payload);
    setIsSubmitting(false);

    if (isHttpOk(res)) {
      setPendingMobile(payload.mobileNumber);
      setStep("otp");
      const otpHint = getApiPayload(res)?.otp;
      toast.success(
        otpHint
          ? `OTP sent. Dev code: ${otpHint}`
          : "OTP sent. Check your phone.",
      );
      return;
    }

    toast.error(getApiErrorMessage(res, "Could not send OTP"));
  };

  const onVerifyOtp = async (data) => {
    setIsSubmitting(true);
    const res = await verifyAuthOtp({
      mobileNumber: pendingMobile,
      otp: data.otp,
    });
    setIsSubmitting(false);

    if (isHttpOk(res)) {
      finishLogin(getApiPayload(res));
      return;
    }

    toast.error(getApiErrorMessage(res, "Invalid or expired OTP"));
  };

  const onPasswordLogin = async () => {
    const valid = await credentialsMethods.trigger(["mobileNumber", "password"]);
    if (!valid) return;

    const { mobileNumber, password } = credentialsMethods.getValues();
    setIsSubmitting(true);
    const res = await loginUser({
      mobileNumber: normalizeMobile(mobileNumber),
      password,
    });
    setIsSubmitting(false);

    if (isHttpOk(res)) {
      finishLogin(getApiPayload(res));
      return;
    }

    toast.error(getApiErrorMessage(res, "Login failed"));
  };

  return (
    <>
      <Header />

      <LoginShell>
        <CityBackdrop aria-hidden>
          <LoginCityBackdropSvg />
        </CityBackdrop>

        <LoginCard>
          <BrandRow>
            <BrandIcon>🏠</BrandIcon>
            <div>
              <BrandName>Property 973</BrandName>
              <BrandSubtext> Real estate Marketplace</BrandSubtext>
            </div>
          </BrandRow>

          {step === "credentials" ? (
            <>
              <Title>Log in or create account</Title>
              <Subtitle>Welcome back - sign in to continue</Subtitle>

              <FormProvider
                methods={credentialsMethods}
                onSubmit={credentialsMethods.handleSubmit(onSendOtp)}
              >
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...credentialsMethods.register("fullName")}
                  aria-invalid={Boolean(
                    credentialsMethods.formState.errors.fullName,
                  )}
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
                  aria-invalid={Boolean(
                    credentialsMethods.formState.errors.mobileNumber,
                  )}
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
                  aria-invalid={Boolean(
                    credentialsMethods.formState.errors.password,
                  )}
                />
                {credentialsMethods.formState.errors.password && (
                  <ErrorText>
                    {credentialsMethods.formState.errors.password.message}
                  </ErrorText>
                )}

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send OTP"}
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  disabled={isSubmitting}
                  onClick={onPasswordLogin}
                >
                  Sign in with password only
                </SecondaryButton>
              </FormProvider>

              <Link href="/register" passHref legacyBehavior>
                <FooterLink as="span">Create a new account</FooterLink>
              </Link>
            </>
          ) : (
            <>
              <Title>Enter verification code</Title>
              <Subtitle>
                We sent a 6-digit code to {pendingMobile}
              </Subtitle>

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
                  aria-invalid={Boolean(otpMethods.formState.errors.otp)}
                />
                {otpMethods.formState.errors.otp && (
                  <ErrorText>{otpMethods.formState.errors.otp.message}</ErrorText>
                )}

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Verifying…" : "Verify & sign in"}
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

          <DividerRow />

          <StatsRow>
            <StatBox>
              <StatValue>50K+</StatValue>
              <StatLabel>Listings</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>12K+</StatValue>
              <StatLabel>Verified agents</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>4.8/5★</StatValue>
              <StatLabel>Trust rating</StatLabel>
            </StatBox>
          </StatsRow>
        </LoginCard>
      </LoginShell>
      <Footer />
    </>
  );
};

export default LoginPage;

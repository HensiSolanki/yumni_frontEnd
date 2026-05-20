"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import { FormProvider } from "@/components/hook-form";
import { otpSchema } from "@/schemas/authSchema";
import { useRef, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";
import {
  BackLinkButton,
  BackLinkRow,
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  Label,
  LoginCard,
  LoginShell,
  OtpDigitInput,
  OtpRow,
  PrimaryButton,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "./style";
import { verifyOtpAction } from "@/redux/auth/action";
import { useDispatch } from "react-redux";

const PENDING_MOBILE_KEY = "authPendingMobile";
const OTP_FIELDS = ["digit1", "digit2", "digit3", "digit4", "digit5", "digit6"];

const subscribeNoop = () => () => { };

const getPendingMobile = () =>
  sessionStorage.getItem(PENDING_MOBILE_KEY) || "";

const getPendingMobileServer = () => "";

const OtpPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const inputRefs = useRef([]);
  const mobileNumber = useSyncExternalStore(
    subscribeNoop,
    getPendingMobile,
    getPendingMobileServer
  );

  const methods = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const focusDigit = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleDigitChange = (index, event) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    const fieldName = OTP_FIELDS[index];

    setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });

    if (value && index < OTP_FIELDS.length - 1) {
      focusDigit(index + 1);
    }
  };

  const handleDigitKeyDown = (index, event) => {
    const fieldName = OTP_FIELDS[index];
    const currentValue = getValues(fieldName);

    if (event.key === "Backspace" && !currentValue && index > 0) {
      focusDigit(index - 1);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      focusDigit(index - 1);
    }

    if (event.key === "ArrowRight" && index < OTP_FIELDS.length - 1) {
      focusDigit(index + 1);
    }
  };

  const handleDigitPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_FIELDS.length);

    if (!pasted) return;

    pasted.split("").forEach((digit, index) => {
      setValue(OTP_FIELDS[index], digit, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });

    const nextIndex = Math.min(pasted.length, OTP_FIELDS.length - 1);
    focusDigit(nextIndex);
  };

  const onSubmit = async (data) => {
    const otp = OTP_FIELDS.map((field) => data[field]).join("");
    console.log("OTP submitted:", otp);
    try {
      const response = await dispatch(
        verifyOtpAction({
          otp,
          mobileNumber,
        })
      ).unwrap();

      if (response?.success === true) {
        router.push(PATH_AUTH.root);
      }
    } catch (error) {
      console.error("OTP error:", error);
    }
  };

  const firstOtpError =
    errors.digit1?.message ||
    errors.digit2?.message ||
    errors.digit3?.message ||
    errors.digit4?.message ||
    errors.digit5?.message ||
    errors.digit6?.message;

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

          <Title>Verify your number</Title>
          <Subtitle>
            {mobileNumber
              ? `Enter the 6-digit code sent to ${mobileNumber}`
              : "Enter the 6-digit verification code"}
          </Subtitle>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="digit1">Verification code</Label>
            <OtpRow>
              {OTP_FIELDS.map((fieldName, index) => {
                const { ref, ...field } = register(fieldName);

                return (
                  <OtpDigitInput
                    key={fieldName}
                    id={index === 0 ? "digit1" : undefined}
                    {...field}
                    ref={(element) => {
                      ref(element);
                      inputRefs.current[index] = element;
                    }}
                    onChange={(event) => handleDigitChange(index, event)}
                    onKeyDown={(event) => handleDigitKeyDown(index, event)}
                    onPaste={handleDigitPaste}
                    aria-invalid={Boolean(errors[fieldName])}
                  />
                );
              })}
            </OtpRow>
            {firstOtpError && <ErrorText>{firstOtpError}</ErrorText>}

            <PrimaryButton type="submit">Verify OTP</PrimaryButton>
          </FormProvider>

          <BackLinkRow>
            Wrong number?
            <BackLinkButton type="button" onClick={() => router.push(PATH_AUTH.login)}>
              Back to login
            </BackLinkButton>
          </BackLinkRow>

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

export default OtpPage;

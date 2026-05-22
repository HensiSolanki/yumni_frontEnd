"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import LoginCityBackdropSvg from "@/assets/LoginCityBackdropSvg.svg";
import { FormProvider } from "@/components/hook-form";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/index";
import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";
import {
  BrandIcon,
  BrandName,
  BrandRow,
  BrandSubtext,
  CityBackdrop,
  DividerRow,
  ErrorText,
  Input,
  Label,
  LoginCard,
  LoginShell,
  ModeToggleButton,
  ModeToggleRow,
  PrimaryButton,
  StatBox,
  StatLabel,
  StatsRow,
  StatValue,
  Subtitle,
  Title,
} from "./style";
import { loginAction, registerAction } from "@/redux/auth/action";
import { setOtp } from "@/redux/auth/slice";
import { useDispatch, useSelector } from "react-redux";

const AUTH_COPY = {
  login: {
    title: "Log in or create account",
    subtitle: "Welcome back - sign in to continue",
    submitLabel: "Log in",
    togglePrompt: "Don't have an account?",
    toggleAction: "Create account",
  },
  register: {
    title: "Create your account",
    subtitle: "Join Property 973 - sign up to get started",
    submitLabel: "Send OTP",
    togglePrompt: "Already have an account?",
    toggleAction: "Log in",
  },
};

const AuthFormFields = ({ register, errors }) => (
  <>
    <Label htmlFor="fullName">Full name</Label>
    <Input
      id="fullName"
      placeholder="Enter your full name"
      {...register("fullName")}
      aria-invalid={Boolean(errors.fullName)}
    />
    {errors.fullName && <ErrorText>{errors.fullName.message}</ErrorText>}

    <Label htmlFor="mobileNumber">Mobile number</Label>
    <Input
      id="mobileNumber"
      placeholder="+966  Mobile number"
      {...register("mobileNumber")}
      aria-invalid={Boolean(errors.mobileNumber)}
    />
    {errors.mobileNumber && <ErrorText>{errors.mobileNumber.message}</ErrorText>}

    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      type="password"
      placeholder="••••••••"
      {...register("password")}
      aria-invalid={Boolean(errors.password)}
    />
    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
  </>
);

const PENDING_MOBILE_KEY = "authPendingMobile";

const OtpSuccessAlert = ({ otp, onConfirm }) => {
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (otp == null || hasShownRef.current) return;

    hasShownRef.current = true;

    Swal.fire({
      title: "OTP sent",
      text: `Your OTP is: ${otp}, save this otp it will be used to verify your account`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-brand)",
    }).then(() => {
      onConfirm();
    });
  }, [otp, onConfirm]);

  return null;
};

const LoginPage = () => {
  const AuthSelector = useSelector((state) => state.authSlice);
  const [mode, setMode] = useState("login");

  const isLogin = mode === "login";
  const copy = AUTH_COPY[mode];
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const switchMode = (nextMode) => {
    setMode(nextMode);
    reset({
      fullName: "",
      mobileNumber: "",
      password: "",
    });
  };

  const handleOtpAlertConfirm = useCallback(() => {
    dispatch(setOtp(null));
    router.push(PATH_AUTH.otp);
  }, [dispatch, router]);

  const onSubmit = async (data) => {
    sessionStorage.setItem(PENDING_MOBILE_KEY, data.mobileNumber);

    if (isLogin) {
      try {
        const response = await dispatch(
          loginAction({
            password: data.password,
            mobileNumber: data.mobileNumber,
          })
        ).unwrap();

        if (response?.success === true) {
          router.push(PATH_AUTH.myProfile);
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }

    try {
      const response = await dispatch(
        registerAction({
          password: data.password,
          fullName: data.fullName,
          mobileNumber: data.mobileNumber,
        })
      ).unwrap();
      console.log("Register success:", response);
    } catch (error) {
      console.error("Register error:", error);
    }
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

          <Title>{copy.title}</Title>
          <Subtitle>{copy.subtitle}</Subtitle>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <AuthFormFields register={register} errors={errors} />
            <PrimaryButton type="submit">{copy.submitLabel}</PrimaryButton>
          </FormProvider>

          <ModeToggleRow>
            {copy.togglePrompt}
            <ModeToggleButton
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
            >
              {copy.toggleAction}
            </ModeToggleButton>
          </ModeToggleRow>

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

      {AuthSelector?.otp != null && (
        <OtpSuccessAlert otp={AuthSelector.otp} onConfirm={handleOtpAlertConfirm} />
      )}

      <Footer />
    </>
  );
};

export default LoginPage;

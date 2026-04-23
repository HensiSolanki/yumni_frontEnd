"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { CloseIconSvg } from "@/assets";
import { setAddButtonPopUp } from "@/redux/header/slice";

import {
  CloseBtn,
  OptionCard,
  OptionIcon,
  OptionSub,
  OptionsGrid,
  OptionTitle,
  Overlay,
  Panel,
  PanelHeader,
  PanelTitle,
} from "./style";
import { useRouter } from "@/i18n/navigation";

const HouseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="M6 18L20 6L34 18V32C34 33.1 33.1 34 32 34H8C6.9 34 6 33.1 6 32V18Z"
      fill="#f1f5f9"
      stroke="#cbd5e1"
      strokeWidth="1"
    />
    <path d="M6 18L20 6L34 18" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 34V22H28V34" fill="#8B5A3B" />
    <path d="M8 16L20 6L32 16" fill="#CE1126" />
    <rect x="17" y="24" width="6" height="10" rx="0.5" fill="#5C3D2E" />
  </svg>
);

const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="17" cy="17" r="9" stroke="#7C3AED" strokeWidth="2.5" />
    <circle cx="17" cy="17" r="6" fill="#38BDF8" fillOpacity="0.35" />
    <path
      d="M24 24L32 32"
      stroke="#7C3AED"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function AddButtonPopUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Header");
  const open = useSelector(
    (state: { headerApiSlice: { addButtonPopUp: boolean } }) =>
      state.headerApiSlice.addButtonPopUp,
  );
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleRealEstateClick = () => {
    close();
    router.push("/add-listing");
  };

  const handlePropertyRequestClick = () => {
   
  };

  const close = useCallback(() => {
    dispatch(setAddButtonPopUp(false));
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  if (!isClient || !open) {
    return null;
  }

  const content = (
    <Overlay
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-menu-title"
        onClick={(e) => e.stopPropagation()}
      >
        <PanelHeader>
          <PanelTitle id="add-menu-title">{t("addMenuTitle")}</PanelTitle>
          <CloseBtn type="button" onClick={close} aria-label={t("addMenuCloseAria")}>
            <CloseIconSvg />
          </CloseBtn>
        </PanelHeader>

        <OptionsGrid>
          <OptionCard  onClick={()=>handleRealEstateClick()}>
            <OptionIcon>
              <HouseIcon />
            </OptionIcon>
            <OptionTitle className="option-title">{t("addMenuListingTitle")}</OptionTitle>
            <OptionSub className="option-sub">{t("addMenuListingSub")}</OptionSub>
          </OptionCard>

          <OptionCard  onClick={()=>handlePropertyRequestClick()}>
            <OptionIcon>
              <SearchIcon />
            </OptionIcon>
            <OptionTitle className="option-title">{t("addMenuRequestTitle")}</OptionTitle>
            <OptionSub className="option-sub">{t("addMenuRequestSub")}</OptionSub>
          </OptionCard>
        </OptionsGrid>
      </Panel>
    </Overlay>
  );

  return createPortal(content, document.body);
}

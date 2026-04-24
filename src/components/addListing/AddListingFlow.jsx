"use client";

import { useTranslations } from "next-intl";

import {
  ChevronWrap,
  ListSectionTitle,
  ListingHint,
  ListingOption,
  ListingRight,
  ListingStack,
  ListingTextBlock,
  ListingTitle,
  PageShell,
  PageTitle,
  RoleCard,
  RoleIconWrap,
  RoleLabel,
  RoleRow,
  StatusPill,
  StepBadge,
} from "./AddListingFlow.style";
import { useDispatch, useSelector } from "react-redux";
import { setListingKind, setRole } from "@/redux/addlisting/slice";

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconOwner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6.5 20v-1.25a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4V20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M17 6.5h3.5M18.75 4.75v3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHouse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21.5V14h5v7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ROLES = [
  { id: "broker", icon: <IconBriefcase /> },
  { id: "owner", icon: <IconOwner /> },
  { id: "host", icon: <IconHouse /> },
];

export default function AddListingFlow() {
  const t = useTranslations("Pages");
  const dispatch = useDispatch();
  const addListingState = useSelector((state)=>state.addListingApiSlice);
  const role = addListingState.role;
  const listingKind = addListingState.listingKind;
  console.log("role=====>",listingKind);

  return (
    <PageShell>
      <PageTitle>{t("addListingTitle")}</PageTitle>

      <RoleRow role="group" aria-label={t("addListingFlow.roleGroupLabel")}>
        {ROLES.map(({ id, icon }) => (
          <RoleCard
            key={id}
            type="button"
            $active={role === id}
            onClick={() => {dispatch(setRole(id)),dispatch((id == "broker" || id == "owner") ? setListingKind("licensed") : setListingKind("dailyMonthly"))}}
            aria-pressed={role === id}
          >
            <RoleIconWrap>{icon}</RoleIconWrap>
            <RoleLabel>{id}</RoleLabel>
          </RoleCard>
        ))}
      </RoleRow>
      {role !== "null" && (
        <>
      <ListSectionTitle>{t("addListingFlow.listTypeHeading")}</ListSectionTitle>
     
      <ListingStack>
      {(role ==="broker" || role === "owner") && (
        <ListingOption
          type="button"
          $active={listingKind === "licensed"}
          onClick={() => dispatch(setListingKind("licensed"))}
          aria-pressed={listingKind === "licensed"}
        >
          <StepBadge>1</StepBadge>
          <ListingTextBlock>
            <ListingHint>{t("addListingFlow.option1.hint")}</ListingHint>
            <ListingTitle>{t("addListingFlow.option1.title")}</ListingTitle>
          </ListingTextBlock>
          <ListingRight>
            <StatusPill>{t("addListingFlow.option1.badge")}</StatusPill>
            <ChevronWrap>
              <IconChevron />
            </ChevronWrap>
          </ListingRight>
        </ListingOption>
      )}
      {role === "owner" && (
        <ListingOption
          type="button"
          $active={listingKind === "marketing"}
          onClick={() => dispatch(setListingKind("marketing"))}
          aria-pressed={listingKind === "marketing"}
        >
          <StepBadge>2</StepBadge>
          <ListingTextBlock>
            <ListingHint>{t("addListingFlow.option2.hint")}</ListingHint>
            <ListingTitle>{t("addListingFlow.option2.title")}</ListingTitle>
          </ListingTextBlock>
          <ListingRight>
            <StatusPill>{t("addListingFlow.option2.badge")}</StatusPill>
            <ChevronWrap>
              <IconChevron />
            </ChevronWrap>
          </ListingRight>
        </ListingOption>
        )}
      {role === "host" && (
        <ListingOption
          type="button"
          $active={listingKind === "dailyMonthly"}
          onClick={() => dispatch(setListingKind("dailyMonthly"))}
          aria-pressed={listingKind === "dailyMonthly"}
        >
          <StepBadge>1</StepBadge>
          <ListingTextBlock>
            <ListingTitle>Unit for daily/monthly rental</ListingTitle>
            <ListingHint>
              Allows users to book and pay directly through Aqar
            </ListingHint>
          </ListingTextBlock>
          <ListingRight>
            <ChevronWrap>
              <IconChevron />
            </ChevronWrap>
          </ListingRight>
        </ListingOption>
      )}
      </ListingStack>
      </>
      )}
    </PageShell>
  );
}

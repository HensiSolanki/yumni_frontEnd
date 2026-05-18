"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

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
import {
  fetchAddListingOptions,
  fetchListingPreference,
  saveListingPreference,
} from "@/redux/addlisting/services";
import {
  IconBriefcaseSvg,
  IconChevronRightSvg,
  IconHouseLineSvg,
  IconOwnerRoleSvg,
} from "@/assets";
import { useRouter } from "@/i18n/navigation";
import { isAuthenticated } from "@/utils/authSession";
import { getApiErrorMessage, getApiPayload, isHttpOk } from "@/utils/apiResponse";

const ROLE_ICONS = {
  broker: <IconBriefcaseSvg />,
  owner: <IconOwnerRoleSvg />,
  host: <IconHouseLineSvg />,
};

const LISTING_COPY = {
  licensed: {
    hintKey: "addListingFlow.option1.hint",
    titleKey: "addListingFlow.option1.title",
    badgeKey: "addListingFlow.option1.badge",
  },
  marketing: {
    hintKey: "addListingFlow.option2.hint",
    titleKey: "addListingFlow.option2.title",
    badgeKey: "addListingFlow.option2.badge",
  },
  dailyMonthly: {
    title: "Unit for daily/monthly rental",
    hint: "Allows users to book and pay directly through Property 973",
  },
};

export default function AddListingFlow() {
  const t = useTranslations("Pages");
  const dispatch = useDispatch();
  const router = useRouter();
  const addListingState = useSelector((state) => state.addListingApiSlice);
  const role = addListingState.role;
  const listingKind = addListingState.listingKind;

  const [options, setOptions] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetchAddListingOptions();
      if (!isHttpOk(res)) return;

      const data = getApiPayload(res);
      setOptions(data);

      if (!isAuthenticated()) return;

      const prefRes = await fetchListingPreference();
      if (!isHttpOk(prefRes)) return;

      const preference = getApiPayload(prefRes)?.preference;
      if (preference?.role) {
        dispatch(setRole(preference.role));
        dispatch(setListingKind(preference.listingKind));
      }
    };

    load();
  }, [dispatch]);

  const roles = options?.roles ?? [
    { id: "broker", listingKinds: ["licensed"], defaultListingKind: "licensed" },
    {
      id: "owner",
      listingKinds: ["licensed", "marketing"],
      defaultListingKind: "licensed",
    },
    { id: "host", listingKinds: ["dailyMonthly"], defaultListingKind: "dailyMonthly" },
  ];

  const activeRole = roles.find((r) => r.id === role);
  const listingKindsForRole = activeRole?.listingKinds ?? [];

  const stepByKind = (kindId) =>
    options?.listingKinds?.find((k) => k.id === kindId)?.step ??
    (kindId === "marketing" ? 2 : 1);

  const handleRoleSelect = (roleId, defaultKind) => {
    dispatch(setRole(roleId));
    dispatch(setListingKind(defaultKind));
  };

  const handleListingSelect = useCallback(
    async (kind) => {
      dispatch(setListingKind(kind));

      if (!isAuthenticated()) {
        router.push(`/login?redirect=${encodeURIComponent("/add-listing")}`);
        return;
      }

      setIsSaving(true);
      const res = await saveListingPreference({ role, listingKind: kind });
      setIsSaving(false);

      if (isHttpOk(res)) {
        toast.success("Listing preference saved.");
        return;
      }

      toast.error(getApiErrorMessage(res, "Could not save listing preference."));
    },
    [dispatch, role, router],
  );

  return (
    <PageShell>
      <PageTitle>{t("addListingTitle")}</PageTitle>

      <RoleRow role="group" aria-label={t("addListingFlow.roleGroupLabel")}>
        {roles.map(({ id, defaultListingKind }) => (
          <RoleCard
            key={id}
            type="button"
            $active={role === id}
            onClick={() => handleRoleSelect(id, defaultListingKind)}
            aria-pressed={role === id}
          >
            <RoleIconWrap>{ROLE_ICONS[id]}</RoleIconWrap>
            <RoleLabel>{id}</RoleLabel>
          </RoleCard>
        ))}
      </RoleRow>

      {role !== "null" && listingKindsForRole.length > 0 && (
        <>
          <ListSectionTitle>{t("addListingFlow.listTypeHeading")}</ListSectionTitle>

          <ListingStack>
            {listingKindsForRole.map((kind) => {
              const copy = LISTING_COPY[kind];
              const isDaily = kind === "dailyMonthly";

              return (
                <ListingOption
                  key={kind}
                  type="button"
                  $active={listingKind === kind}
                  disabled={isSaving}
                  onClick={() => handleListingSelect(kind)}
                  aria-pressed={listingKind === kind}
                >
                  <StepBadge>{stepByKind(kind)}</StepBadge>
                  <ListingTextBlock>
                    {isDaily ? (
                      <>
                        <ListingTitle>{copy.title}</ListingTitle>
                        <ListingHint>{copy.hint}</ListingHint>
                      </>
                    ) : (
                      <>
                        <ListingHint>{t(copy.hintKey)}</ListingHint>
                        <ListingTitle>{t(copy.titleKey)}</ListingTitle>
                      </>
                    )}
                  </ListingTextBlock>
                  <ListingRight>
                    {!isDaily && copy.badgeKey && (
                      <StatusPill>{t(copy.badgeKey)}</StatusPill>
                    )}
                    <ChevronWrap>
                      <IconChevronRightSvg />
                    </ChevronWrap>
                  </ListingRight>
                </ListingOption>
              );
            })}
          </ListingStack>
        </>
      )}
    </PageShell>
  );
}

"use client";

import Link from "next/link";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CloseIconSvg,
  IconBuildingSvg,
  IconCalendarSvg,
  IconChartSvg,
  IconMapFoldedSvg,
  IconUserFramedSvg,
  MenuIconSvg,
  SaudiMapSilhouetteSvg,
} from "@/assets";
import { setHeaderTabOptions } from "@/redux/header/slice";

/** Brand / active tab / logo — deep green (aqar.fm style) */
const BRAND_GREEN = "#1B5E38";
const MUTED = "#555555";

const MAIN_TABS = [
  { index: 0, label: "Real Estate", Icon: IconBuildingSvg },
  { index: 1, label: "Projects", Icon: IconChartSvg },
  { index: 2, label: "Daily Rent", Icon: IconCalendarSvg },
] as const;

const RIGHT_LINKS = [
  { href: "/map", label: "Map Search", Icon: IconMapFoldedSvg as FC<{ className?: string }> },
  { href: "/add-listing", label: "+ Add" },
  {
    href: "/login",
    label: "",
    Icon: IconUserFramedSvg as FC<{ className?: string }>,
    framedIcon: true,
  },
] as const;

const Header = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: { headerApiSlice: { headerTabOptions: number } }) =>
      state.headerApiSlice.headerTabOptions
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const fontUi =
    "font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif]";

  return (
    <header
      className={`sticky top-0 z-40 border-b border-neutral-200/80 bg-white text-[15px] font-medium leading-none tracking-[-0.01em] text-neutral-800 dark:bg-white ${fontUi}`}
    >
      <div className="relative mx-auto flex h-[52px] max-w-[1400px] items-center px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 justify-start">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E38]/25"
          >
            <div
              className="flex flex-col items-end leading-none"
              style={{ color: BRAND_GREEN }}
            >
              <span
                className="text-[1.0625rem] font-bold tracking-tight"
                dir="rtl"
                lang="ar"
                style={{
                  fontFamily: "var(--font-noto-arabic), system-ui, sans-serif",
                }}
              >
                عقار
              </span>
              <span className="mt-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.22em]">
                AQAR
              </span>
            </div>
            <SaudiMapSilhouetteSvg className="h-9 w-[1.85rem] shrink-0 text-[#1B5E38]" />
          </Link>
        </div>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex"
          aria-label="Main"
        >
          {MAIN_TABS.map(({ index, label, Icon }) => {
            const active = activeTab === index;
            const color = active ? BRAND_GREEN : MUTED;
            return (
              <button
                key={index}
                type="button"
                onClick={() => dispatch(setHeaderTabOptions(index))}
                className={[
                  "flex items-center gap-2 border-b-2 pb-1 text-[14px] transition-colors",
                  active
                    ? "border-[#1B5E38]"
                    : "border-transparent hover:text-neutral-700",
                ].join(" ")}
                style={{ color }}
              >
                <Icon className="shrink-0" />
                <span className="leading-tight">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-8 text-[14px] font-medium md:flex">
          {RIGHT_LINKS.map((item) => {
            const Icon = "Icon" in item ? item.Icon : undefined;
            const isLogin = item.href === "/login";
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-[#555555] transition-opacity hover:opacity-80"
                aria-label={isLogin ? "Login" : undefined}
              >
                {Icon ? (
                  "framedIcon" in item && item.framedIcon ? (
                    <span className="inline-flex rounded border border-neutral-300/90 p-[3px] text-[#555555]">
                      <Icon className="shrink-0" />
                    </span>
                  ) : (
                    <Icon className="shrink-0" />
                  )
                ) : null}
                {item.label ? (
                  <span className="leading-tight">{item.label}</span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <button
            type="button"
            className="-mr-2 rounded p-2 text-[#555555] outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E38]/25"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <CloseIconSvg className="h-6 w-6" />
            ) : (
              <MenuIconSvg className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-50 bg-black/30 md:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-neutral-200/90 bg-white shadow-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/80 px-4 py-3">
              <span className="text-sm font-semibold text-[#555555]">Menu</span>
              <button
                type="button"
                className="rounded p-2 text-[#555555] outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E38]/25"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIconSvg className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5 p-4" aria-label="Mobile">
              {MAIN_TABS.map(({ index, label, Icon }) => {
                const active = activeTab === index;
                const color = active ? BRAND_GREEN : MUTED;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      dispatch(setHeaderTabOptions(index));
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium"
                    style={{
                      color,
                      borderLeft: active
                        ? `3px solid ${BRAND_GREEN}`
                        : "3px solid transparent",
                    }}
                  >
                    <Icon className="shrink-0" />
                    {label}
                  </button>
                );
              })}
              <div className="my-2 border-t border-neutral-200/80" />
              {RIGHT_LINKS.map((item) => {
                const Icon = "Icon" in item ? item.Icon : undefined;
                const isLogin = item.href === "/login";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-[#555555]"
                    aria-label={isLogin ? "Login" : undefined}
                  >
                    {Icon ? (
                      "framedIcon" in item && item.framedIcon ? (
                        <span className="inline-flex rounded border border-neutral-300/90 p-[3px]">
                          <Icon className="shrink-0" />
                        </span>
                      ) : (
                        <Icon className="shrink-0" />
                      )
                    ) : null}
                    {item.label ? item.label : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
};

export default Header;

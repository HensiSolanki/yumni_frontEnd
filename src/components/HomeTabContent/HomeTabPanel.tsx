"use client";

import { useSelector } from "react-redux";

import DailyRentTabContent from "./DailyRentTabContent";
import ProjectsTabContent from "./ProjectsTabContent";
import RealEstateTabContent from "./RealEstateTabContent";

export default function HomeTabPanel() {
  const tab = useSelector(
    (state: { headerApiSlice: { headerTabOptions: number } }) =>
      state.headerApiSlice.headerTabOptions
  );

  if (tab === 1) return <ProjectsTabContent />;
  if (tab === 2) return <DailyRentTabContent />;
  return <RealEstateTabContent />;
}

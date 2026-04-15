"use client";

import { useSelector } from "react-redux";

import DailyRentFilterOption from "@/components/landingPage/dailyRentFilterOption";
import ProjectsFilterOption from "@/components/landingPage/projectsFilterOption";
import RealEstateFilterOption from "@/components/landingPage/realEstatefilterOption";

/** Matches `MAIN_TABS` indices in `Header.tsx`: 0 realEstate, 1 projects, 2 dailyRent */
const HomeFilterByTab = () => {
    const headerTabOptions = useSelector(
        (state) => state.headerApiSlice.headerTabOptions,
    );

    if (headerTabOptions === 0) return <RealEstateFilterOption />;
    if (headerTabOptions === 1) return <ProjectsFilterOption />;
    if (headerTabOptions === 2) return <DailyRentFilterOption />;
    return null;
};

export default HomeFilterByTab;

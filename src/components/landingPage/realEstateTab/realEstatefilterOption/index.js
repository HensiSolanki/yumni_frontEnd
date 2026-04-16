"use client";

import { SearchIconSvg } from "@/assets";
import {
    FilterActionButton,
    FilterActionIcon,
    FilterInner,
    FilterSection,
    FilterWrapper,
    SegmentButton,
    SegmentGroup,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { listingOptionsFilter, propertyOptionsFilter } from "@/constants/options";
import { setListingOptions, setPropertyOptions } from "@/redux/landingPageFilter/slice";

const RealEstateFilterOption = () => {
    const { listingOptions, propertyOptions } = useSelector(state => state.landingPageFilterSlice);
    const dispatch = useDispatch();

    return (
        <FilterSection>
            <FilterInner>
                <FilterWrapper>
                    <FilterActionButton type="button" aria-label="Open filters">
                        <FilterActionIcon aria-hidden="true">
                            <SearchIconSvg />
                        </FilterActionIcon>
                        Filters
                    </FilterActionButton>

                    <SegmentGroup>
                        {listingOptionsFilter?.map((option) => (
                            <SegmentButton
                                key={option}
                                type="button"
                                $active={listingOptions === option}
                                onClick={() => dispatch(setListingOptions(option))}
                            >
                                {option}
                            </SegmentButton>
                        ))}
                    </SegmentGroup>

                    <SegmentGroup>
                        {propertyOptionsFilter?.map((option) => (
                            <SegmentButton
                                key={option}
                                type="button"
                                $active={propertyOptions === option}
                                onClick={() => dispatch(setPropertyOptions(option))}
                            >
                                {option}
                            </SegmentButton>
                        ))}
                    </SegmentGroup>
                </FilterWrapper>
            </FilterInner>
        </FilterSection>
    );
};

export default RealEstateFilterOption;
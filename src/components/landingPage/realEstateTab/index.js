"use client";

import { realEstateCardDemoListings } from "@/constants/options";

import RealEstateCardComponent from "./realEstateCardComponent";
import RealEstateFilterOption from "./realEstatefilterOption";
import { CardStack, CardWrapper } from "./realEstateCardComponent/style";

const RealEstateTab = () => {
  return (
    <>
      <RealEstateFilterOption />
      <CardWrapper>
        <CardStack>
          {realEstateCardDemoListings.map((listing) => (
            <RealEstateCardComponent key={listing.id} listing={listing} />
          ))}
        </CardStack>
      </CardWrapper>
    </>
  );
};

export default RealEstateTab;

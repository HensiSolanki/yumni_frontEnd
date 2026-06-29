"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "@/i18n/navigation";
import { fetchPublicListingsAction } from "@/redux/homepage/action";
import { setSelectedListing } from "@/redux/homepage/slice";
import { PATH_PROPERTY } from "@/routes/path";
import { mapListingToRealEstateCard } from "@/utils/listingDisplay";

import RealEstateCardComponent from "./realEstateCardComponent";
import RealEstateFilterOption from "./realEstatefilterOption";
import { CardStack, CardWrapper, EmptyState } from "./realEstateCardComponent/style";

const RealEstateTab = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, isLoading, error } = useSelector((state) => state.homepageSlice);

  useEffect(() => {
    dispatch(fetchPublicListingsAction());
  }, [dispatch]);

  const handleViewDetails = useCallback(
    (listing) => {
      if (!listing?.id) return;
      dispatch(setSelectedListing(listing));
      router.push(PATH_PROPERTY.detail(listing.id));
    },
    [dispatch, router],
  );

  return (
    <>
      <RealEstateFilterOption />
      <CardWrapper>
        <CardStack>
          {isLoading ? (
            <EmptyState>Loading listings…</EmptyState>
          ) : error ? (
            <EmptyState>{error}</EmptyState>
          ) : items.length === 0 ? (
            <EmptyState>No listings available right now.</EmptyState>
          ) : (
            items.map((listing) => (
              <RealEstateCardComponent
                key={listing.id}
                listing={mapListingToRealEstateCard(listing)}
                onViewDetails={() => handleViewDetails(listing)}
              />
            ))
          )}
        </CardStack>
      </CardWrapper>
    </>
  );
};

export default RealEstateTab;

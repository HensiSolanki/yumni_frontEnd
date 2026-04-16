"use client";

import {
  IconArrowUpRightSvg,
  IconBathPropertySvg,
  IconBedPropertySvg,
  IconBuildingSvg,
  IconCarPropertySvg,
  IconHeartOutlineSvg,
  IconMoreHorizontalSvg,
  IconPhoneSvg,
  IconRulerAreaSvg,
  IconShareNodesSvg,
  IconSofaPropertySvg,
} from "@/assets";
import { realEstateCardDefaultListing } from "@/constants/options";

import {
  ActionButtons,
  AgentBlock,
  AgentMeta,
  AgentName,
  AgentText,
  Avatar,
  Card,
  Description,
  DetailsColumn,
  FeatureBlock,
  FeatureGrid,
  FeatureItem,
  FooterRow,
  IconCircleButton,
  Location,
  MediaColumn,
  MediaIconWrap,
  MediaOverlayTop,
  MediaPlaceholder,
  OutlineButton,
  PhotoCountPill,
  PriceBlock,
  PriceMain,
  PriceSub,
  PrimaryButton,
  Tag,
  Tags,
  Title,
  TopRow,
} from "./style";

/** `iconKey` values must match `@/constants/options` `realEstateCardFeatureOptions`. */
const FEATURE_ICON_MAP = {
  ruler: IconRulerAreaSvg,
  bed: IconBedPropertySvg,
  bath: IconBathPropertySvg,
  sofa: IconSofaPropertySvg,
  car: IconCarPropertySvg,
};

/**
 * @param {object} props
 * @param {object} [props.listing] Merged with `realEstateCardDefaultListing` from `@/constants/options`.
 * @param {() => void} [props.onCall]
 * @param {() => void} [props.onViewDetails]
 */
const RealEstateCardComponent = ({ listing = {}, onCall, onViewDetails }) => {
  const {
    tags,
    priceAnnual,
    priceSub,
    title,
    location,
    features,
    description,
    agentInitials,
    agentName,
    listedAgo,
    photoLabel,
  } = { ...realEstateCardDefaultListing, ...listing };

  return (
    <Card>
      <DetailsColumn>
        <TopRow>
          <Tags>
            {tags.map((t) => (
              <Tag key={t.label} $variant={t.variant}>
                {t.label}
              </Tag>
            ))}
          </Tags>
          <PriceBlock>
            <PriceMain>{priceAnnual}</PriceMain>
            <PriceSub>{priceSub}</PriceSub>
          </PriceBlock>
        </TopRow>

        <Title>{title}</Title>
        <Location>{location}</Location>

        <FeatureBlock>
          <FeatureGrid role="list" aria-label="Property features">
            {features.map((item) => {
              const IconComponent = FEATURE_ICON_MAP[item.iconKey];
              return (
                <FeatureItem key={item.id} role="listitem">
                  {IconComponent ? <IconComponent aria-hidden /> : null}
                  {item.text}
                </FeatureItem>
              );
            })}
          </FeatureGrid>
        </FeatureBlock>

        <Description>{description}</Description>

        <FooterRow>
          <AgentBlock>
            <Avatar aria-hidden>{agentInitials}</Avatar>
            <AgentText>
              <AgentName>{agentName}</AgentName>
              <AgentMeta>{listedAgo}</AgentMeta>
            </AgentText>
          </AgentBlock>
          <ActionButtons>
            <OutlineButton type="button" onClick={onCall} aria-label="Call agent">
              <IconPhoneSvg aria-hidden />
              Call agent
              <IconArrowUpRightSvg aria-hidden />
            </OutlineButton>
            <PrimaryButton type="button" onClick={onViewDetails}>
              View details
              <IconArrowUpRightSvg aria-hidden />
            </PrimaryButton>
          </ActionButtons>
        </FooterRow>
      </DetailsColumn>

      <MediaColumn>
        <MediaPlaceholder>
          <MediaIconWrap aria-hidden>
            <IconBuildingSvg width={48} height={48} />
          </MediaIconWrap>
          Property photo
        </MediaPlaceholder>
        <MediaOverlayTop>
          <IconCircleButton type="button" aria-label="More options">
            <IconMoreHorizontalSvg aria-hidden />
          </IconCircleButton>
          <IconCircleButton type="button" aria-label="Save to wishlist">
            <IconHeartOutlineSvg aria-hidden />
          </IconCircleButton>
          <IconCircleButton type="button" aria-label="Share">
            <IconShareNodesSvg aria-hidden />
          </IconCircleButton>
        </MediaOverlayTop>
        <PhotoCountPill>{photoLabel}</PhotoCountPill>
      </MediaColumn>
    </Card>
  );
};

export default RealEstateCardComponent;

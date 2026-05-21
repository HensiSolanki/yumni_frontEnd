import styled from "styled-components";

const border = "0.5px solid #e8e6e1";
const radiusLg = "12px";
const radiusMd = "8px";

export const PageWrap = styled.div`
  background: #f5f4f0;
  min-height: calc(100vh - 58px);
`;

export const AppShell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  background: #f5f4f0;
  border-radius: ${radiusLg};
  border: ${border};
  overflow: hidden;
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  background: #fff;
  border-right: ${border};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: 600px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: ${radiusMd};
  cursor: pointer;
  font-size: 13px;
  color: ${({ $active }) => ($active ? "#1a1a18" : "#6b6a67")};
  border: none;
  background: ${({ $active }) => ($active ? "#f5f4f0" : "none")};
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  &:hover {
    background: #f5f4f0;
    color: #1a1a18;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const SidebarBadge = styled.span`
  margin-left: auto;
  background: #e1f5ee;
  color: #085041;
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 500;
`;

export const Main = styled.main`
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: #6b6a67;
  margin: 2px 0 0;
`;

export const HeaderBtns = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const BtnOutline = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  padding: 6px 14px;
  border-radius: ${radiusMd};
  border: 0.5px solid #d3d1cb;
  background: none;
  color: #6b6a67;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f5f4f0;
    color: #1a1a18;
  }
`;

export const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  padding: 6px 14px;
  border-radius: ${radiusMd};
  border: none;
  background: #1a1a18;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;

  &:hover {
    opacity: 0.9;
  }
`;

export const ProfileBanner = styled.section`
  background: #fff;
  border: ${border};
  border-radius: ${radiusLg};
  padding: 20px;
`;

export const BannerTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: auto 1fr;
  }
`;

export const AvatarLg = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #e1f5ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  color: #085041;
  border: 2px solid #e8e6e1;
  flex-shrink: 0;
`;

export const OwnerName = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #1a1a18;
`;

export const OwnerMeta = styled.div`
  font-size: 12px;
  color: #6b6a67;
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const MetaDivider = styled.span`
  color: #d3d1cb;
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #e1f5ee;
  color: #085041;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
`;

export const ContactLine = styled.div`
  font-size: 12px;
  color: #6b6a67;
  margin-top: 6px;
`;

export const RatingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const RatingLabel = styled.div`
  font-size: 11px;
  color: #9b9a97;
`;

export const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #ba7517;
  font-size: 16px;
`;

export const RatingValue = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
  margin-left: 4px;
`;

export const BannerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: ${border};

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const BannerStat = styled.div`
  text-align: center;
`;

export const BannerStatNum = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #1a1a18;
`;

export const BannerStatLbl = styled.div`
  font-size: 11px;
  color: #9b9a97;
  margin-top: 2px;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: #f5f4f0;
  border-radius: ${radiusMd};
  padding: 14px;
`;

export const StatLbl = styled.div`
  font-size: 11px;
  color: #9b9a97;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatVal = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #1a1a18;
`;

export const StatChg = styled.div`
  font-size: 11px;
  margin-top: 3px;
  color: ${({ $down }) => ($down ? "#a32d2d" : "#0f6e56")};
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background: #fff;
  border: ${border};
  border-radius: ${radiusLg};
  padding: 16px;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const CardTitle = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
`;

export const CardAction = styled.button`
  font-size: 12px;
  color: #9b9a97;
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;

  &:hover {
    color: #6b6a67;
  }
`;

export const PropList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PropItem = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px;
  background: #f5f4f0;
  border-radius: ${radiusMd};
  cursor: pointer;

  &:hover {
    background: #eeede8;
  }
`;

export const PropThumb = styled.div`
  width: 52px;
  height: 44px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg || "#e1f5ee"};

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const PropName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
`;

export const PropLoc = styled.div`
  font-size: 11px;
  color: #6b6a67;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const PropPrice = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
  text-align: right;
`;

export const PropStatus = styled.div`
  font-size: 11px;
  text-align: right;
  margin-top: 3px;
  color: ${({ $variant }) => {
    if ($variant === "rented") return "#185fa5";
    if ($variant === "pending") return "#854f0b";
    return "#0f6e56";
  }};
`;

export const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InquiryItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 0;
  border-bottom: ${border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const InquiryAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

export const InquiryBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InquiryName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
`;

export const InquiryMsg = styled.div`
  font-size: 12px;
  color: #6b6a67;
  margin-top: 1px;
  line-height: 1.4;
`;

export const InquiryTime = styled.div`
  font-size: 11px;
  color: #9b9a97;
`;

export const InquiryTag = styled.span`
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 999px;
  font-weight: 500;
  white-space: nowrap;
  background: ${({ $variant }) => {
    if ($variant === "visit") return "#e6f1fb";
    if ($variant === "replied") return "#f1efe8";
    return "#e1f5ee";
  }};
  color: ${({ $variant }) => {
    if ($variant === "visit") return "#0c447c";
    if ($variant === "replied") return "#444441";
    return "#085041";
  }};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #f5f4f0;
  border-radius: ${radiusMd};

  svg {
    width: 15px;
    height: 15px;
    color: #6b6a67;
    flex-shrink: 0;
  }
`;

export const InfoLbl = styled.div`
  font-size: 11px;
  color: #9b9a97;
`;

export const InfoVal = styled.div`
  font-size: 13px;
  color: #1a1a18;
  font-weight: 500;
`;

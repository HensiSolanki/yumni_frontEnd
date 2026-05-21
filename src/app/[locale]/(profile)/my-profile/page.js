"use client";

import {
  IconBuildingSvg,
  IconCalendarSvg,
  IconChartSvg,
  IconCheckSmallSvg,
  IconHeartOutlineSvg,
  IconHouseLineSvg,
  IconMapFoldedSvg,
  IconOwnerRoleSvg,
  IconPhoneSvg,
  IconUserFramedSvg,
} from "@/assets";
import DashboardHeader from "@/components/dashboardHeader";
import { useStoredUser } from "@/utils/useStoredUser";
import {
  AppShell,
  AvatarLg,
  BannerStat,
  BannerStatLbl,
  BannerStatNum,
  BannerStats,
  BannerTop,
  BtnOutline,
  BtnPrimary,
  Card,
  CardAction,
  CardHead,
  CardTitle,
  ContactLine,
  HeaderBtns,
  InfoGrid,
  InfoLbl,
  InfoRow,
  InfoVal,
  InquiryAvatar,
  InquiryBody,
  InquiryItem,
  InquiryList,
  InquiryMsg,
  InquiryName,
  InquiryTag,
  InquiryTime,
  Layout,
  Main,
  MetaDivider,
  OwnerMeta,
  OwnerName,
  PageHeader,
  PageSub,
  PageTitle,
  PageWrap,
  ProfileBanner,
  PropItem,
  PropList,
  PropLoc,
  PropName,
  PropPrice,
  PropStatus,
  PropThumb,
  RatingBlock,
  RatingLabel,
  RatingValue,
  Sidebar,
  SidebarBadge,
  SidebarItem,
  StarsRow,
  StatCard,
  StatChg,
  StatLbl,
  StatVal,
  StatsRow,
  TwoCol,
  VerifiedBadge,
} from "./style";

const DEMO_PROPERTIES = [
  {
    id: 1,
    name: "2BHK Apartment",
    location: "Satellite, Ahmedabad",
    price: "₹18,000/mo",
    status: "Active",
    variant: "active",
    thumbBg: "#E1F5EE",
    iconColor: "#0F6E56",
    Icon: IconBuildingSvg,
  },
  {
    id: 2,
    name: "3BHK Villa",
    location: "Prahlad Nagar, Ahmedabad",
    price: "₹35,000/mo",
    status: "Rented",
    variant: "rented",
    thumbBg: "#E6F1FB",
    iconColor: "#185FA5",
    Icon: IconHouseLineSvg,
  },
  {
    id: 3,
    name: "Commercial shop",
    location: "CG Road, Ahmedabad",
    price: "₹22,000/mo",
    status: "Under review",
    variant: "pending",
    thumbBg: "#FAEEDA",
    iconColor: "#854F0B",
    Icon: IconBuildingSvg,
  },
];

const DEMO_INQUIRIES = [
  {
    id: 1,
    initials: "PK",
    name: "Priya Kapoor",
    message: "Interested in 2BHK — is it pet friendly?",
    time: "10 min ago",
    tag: "New",
    tagVariant: "new",
    bg: "#E1F5EE",
    color: "#085041",
  },
  {
    id: 2,
    initials: "AM",
    name: "Arjun Mehta",
    message: "Can I schedule a visit this Saturday?",
    time: "2 hr ago",
    tag: "Visit",
    tagVariant: "visit",
    bg: "#E6F1FB",
    color: "#0C447C",
  },
  {
    id: 3,
    initials: "SS",
    name: "Sneha Shah",
    message: "Is the 3BHK still available for next month?",
    time: "Yesterday",
    tag: "New",
    tagVariant: "new",
    bg: "#F1EFE8",
    color: "#444441",
  },
  {
    id: 4,
    initials: "RD",
    name: "Ravi Desai",
    message: "Thank you for the quick reply!",
    time: "2 days ago",
    tag: "Replied",
    tagVariant: "replied",
    bg: "#EEEDFE",
    color: "#3C3489",
  },
];

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getFirstName = (name) => {
  if (!name || typeof name !== "string") return "there";
  return name.trim().split(/\s+/)[0] || "there";
};

const MyProfilePage = () => {
  const user = useStoredUser();

  const displayName = user?.fullName || "Property owner";
  const firstName = getFirstName(user?.fullName);
  const initials = getInitials(user?.fullName);
  const email = user?.email || "—";
  const phone = user?.mobileNumber || "—";
  const role = user?.role || "Owner";

  const accountFields = [
    { label: "Full name", value: displayName, Icon: IconUserFramedSvg },
    { label: "Email", value: email, Icon: IconOwnerRoleSvg },
    { label: "Phone", value: phone, Icon: IconPhoneSvg },
    { label: "Role", value: role, Icon: IconOwnerRoleSvg },
    {
      label: "Account status",
      value: user ? "Active" : "—",
      Icon: IconCheckSmallSvg,
      highlight: user ? "#0F6E56" : undefined,
    },
    { label: "Member since", value: "—", Icon: IconCalendarSvg },
  ];

  const GetUserProfile = async () => {

  }

  return (
    <>
      <DashboardHeader />

      <PageWrap>
        <AppShell>
          <Layout>
            <Sidebar>
              <SidebarItem type="button" $active>
                <IconUserFramedSvg aria-hidden />
                My profile
              </SidebarItem>
              <SidebarItem type="button">
                <IconBuildingSvg aria-hidden />
                My properties
                <SidebarBadge>3</SidebarBadge>
              </SidebarItem>
              <SidebarItem type="button">
                <IconHouseLineSvg aria-hidden />
                Add property
              </SidebarItem>
              <SidebarItem type="button">
                <IconChartSvg aria-hidden />
                Inquiries
                <SidebarBadge>5</SidebarBadge>
              </SidebarItem>
              <SidebarItem type="button">
                <IconCalendarSvg aria-hidden />
                Site visits
              </SidebarItem>
              <SidebarItem type="button">
                <IconChartSvg aria-hidden />
                Analytics
              </SidebarItem>             
             
            </Sidebar>

            <Main>
              <PageHeader>
                <div>
                  <PageTitle>My profile</PageTitle>
                  <PageSub>
                    Welcome back, {firstName} — here&apos;s your owner dashboard
                  </PageSub>
                </div>
                <HeaderBtns>
                  <BtnOutline type="button">Public view</BtnOutline>
                  <BtnPrimary type="button">Edit profile</BtnPrimary>
                </HeaderBtns>
              </PageHeader>

              <ProfileBanner>
                <BannerTop>
                  <AvatarLg>{initials}</AvatarLg>
                  <div>
                    <OwnerName>{displayName}</OwnerName>
                    <OwnerMeta>
                      <span>
                        <IconMapFoldedSvg
                          aria-hidden
                          style={{ width: 13, height: 13, verticalAlign: -2 }}
                        />{" "}
                        Location not set
                      </span>
                      <MetaDivider>|</MetaDivider>
                      <span>Member since —</span>
                      {user && (
                        <>
                          <MetaDivider>|</MetaDivider>
                          <VerifiedBadge>
                            <IconCheckSmallSvg
                              aria-hidden
                              style={{ width: 12, height: 12 }}
                            />
                            Verified owner
                          </VerifiedBadge>
                        </>
                      )}
                    </OwnerMeta>
                    <ContactLine>
                      {email}
                      {phone !== "—" && (
                        <>
                          {" "}
                          &nbsp;·&nbsp; {phone}
                        </>
                      )}
                    </ContactLine>
                  </div>
                  <RatingBlock>
                    <RatingLabel>Owner rating</RatingLabel>
                    <StarsRow aria-label="4.5 out of 5 stars">
                      ★★★★☆
                      <RatingValue>4.5</RatingValue>
                    </StarsRow>
                    <RatingLabel>24 reviews</RatingLabel>
                  </RatingBlock>
                </BannerTop>
                <BannerStats>
                  <BannerStat>
                    <BannerStatNum>3</BannerStatNum>
                    <BannerStatLbl>Properties listed</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>5</BannerStatNum>
                    <BannerStatLbl>Active inquiries</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>2</BannerStatNum>
                    <BannerStatLbl>Currently rented</BannerStatLbl>
                  </BannerStat>
                  <BannerStat>
                    <BannerStatNum>142</BannerStatNum>
                    <BannerStatLbl>Profile views</BannerStatLbl>
                  </BannerStat>
                </BannerStats>
              </ProfileBanner>

              <StatsRow>
                <StatCard>
                  <StatLbl>Total views</StatLbl>
                  <StatVal>142</StatVal>
                  <StatChg>+18 this week</StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>Inquiries</StatLbl>
                  <StatVal>5</StatVal>
                  <StatChg>2 new today</StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>Rent earned</StatLbl>
                  <StatVal>₹48k</StatVal>
                  <StatChg>This month</StatChg>
                </StatCard>
                <StatCard>
                  <StatLbl>
                    Wishlist saves
                    <IconHeartOutlineSvg aria-hidden style={{ width: 13, height: 13 }} />
                  </StatLbl>
                  <StatVal>31</StatVal>
                  <StatChg $down>-3 this week</StatChg>
                </StatCard>
              </StatsRow>

              <TwoCol>
                <Card>
                  <CardHead>
                    <CardTitle>My properties</CardTitle>
                    <CardAction type="button">View all</CardAction>
                  </CardHead>
                  <PropList>
                    {DEMO_PROPERTIES.map(
                      ({ id, name, location, price, status, variant, thumbBg, iconColor, Icon }) => (
                        <PropItem key={id}>
                          <PropThumb $bg={thumbBg}>
                            <Icon style={{ color: iconColor }} aria-hidden />
                          </PropThumb>
                          <div>
                            <PropName>{name}</PropName>
                            <PropLoc>
                              <IconMapFoldedSvg aria-hidden style={{ width: 12, height: 12 }} />
                              {location}
                            </PropLoc>
                          </div>
                          <div>
                            <PropPrice>{price}</PropPrice>
                            <PropStatus $variant={variant}>• {status}</PropStatus>
                          </div>
                        </PropItem>
                      ),
                    )}
                  </PropList>
                </Card>

                <Card>
                  <CardHead>
                    <CardTitle>Recent inquiries</CardTitle>
                    <CardAction type="button">View all</CardAction>
                  </CardHead>
                  <InquiryList>
                    {DEMO_INQUIRIES.map(
                      ({
                        id,
                        initials: inqInitials,
                        name,
                        message,
                        time,
                        tag,
                        tagVariant,
                        bg,
                        color,
                      }) => (
                        <InquiryItem key={id}>
                          <InquiryAvatar $bg={bg} $color={color}>
                            {inqInitials}
                          </InquiryAvatar>
                          <InquiryBody>
                            <InquiryName>{name}</InquiryName>
                            <InquiryMsg>{message}</InquiryMsg>
                            <InquiryTime>{time}</InquiryTime>
                          </InquiryBody>
                          <InquiryTag $variant={tagVariant}>{tag}</InquiryTag>
                        </InquiryItem>
                      ),
                    )}
                  </InquiryList>
                </Card>
              </TwoCol>

              <Card>
                <CardHead>
                  <CardTitle>Account information</CardTitle>
                  <BtnOutline type="button" style={{ fontSize: 11 }}>
                    Edit
                  </BtnOutline>
                </CardHead>
                <InfoGrid>
                  {accountFields.map(({ label, value, Icon, highlight }) => (
                    <InfoRow key={label}>
                      <Icon aria-hidden />
                      <div>
                        <InfoLbl>{label}</InfoLbl>
                        <InfoVal style={highlight ? { color: highlight } : undefined}>
                          {value}
                        </InfoVal>
                      </div>
                    </InfoRow>
                  ))}
                </InfoGrid>
              </Card>
            </Main>
          </Layout>
        </AppShell>
      </PageWrap>

    </>
  );
};

export default MyProfilePage;

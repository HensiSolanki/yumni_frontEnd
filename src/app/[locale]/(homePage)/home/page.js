import Header from "@/components/Header/Header";
import HomeTabPanel from "@/components/HomeTabContent/HomeTabPanel";
import HomeFilterByTab from "@/components/landingPage/homeFilterByTab";

const HomePage = () => {
  return (
    <main style={{ backgroundColor: "#f4f7f8", minHeight: "100vh" }}>
      <Header />
      <HomeFilterByTab />
      <HomeTabPanel />
    </main>
  );
};

export default HomePage;
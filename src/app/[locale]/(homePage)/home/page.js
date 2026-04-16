import Header from "@/components/Header/Header";
import HomeTabPanel from "@/components/landingPage/homeFilterByTab";

const HomePage = () => {
  return (
    <main style={{ backgroundColor: "#f4f7f8", minHeight: "100vh" }}>
      <Header />
      <HomeTabPanel />
    </main>
  );
};

export default HomePage;
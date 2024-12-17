import HeroSection from "../components/HeroSection";
import MenuSection from "../components/MenuSection";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopDishesSection from "../components/TopDishesSection";

function Home() {
  const { showForm, showLogin, showSignup } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <>
      <HeroSection />
      <MenuSection />
      <TopDishesSection />
      <Cta />
      <Footer />
      {showForm && showLogin && <Login />}
      {showForm && showSignup && <Signup />}
    </>
  );
}

export default Home;

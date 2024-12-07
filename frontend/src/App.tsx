import Navbar from "./components/Navbar";
import Intro from "./components/HeroSection";
import Menu from "./components/MenuSection";
import TopDishes from "./components/TopDishesSection";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const apiHost = import.meta.env.VITE_LARAVEL_API_URL;
    fetch(`${apiHost}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  }, []);

  const { showForm, showLogin, showSignup } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <div
        className={
          showForm
            ? "relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:z-30 before:bg-slate-950/40"
            : ""
        }
      >
        <Navbar />
        <Intro />
        <Menu />
        <TopDishes />
        <Cta />
        <Footer />
        {showForm && showLogin && <Login />}
        {showForm && showSignup && <Signup />}
      </div>
    </>
  );
}

export default App;

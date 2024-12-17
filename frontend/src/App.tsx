import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import isUserLoggedIn from "./functions/isUserLoggedIn";
import { useEffect } from "react";
import { setIsLoggedIn } from "./redux/auth";

function App() {
  const { showForm, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const value = await isUserLoggedIn();
      if (value) {
        dispatch(setIsLoggedIn());
      }
    };
    checkIfUserIsLoggedIn();
  }, [isLoggedIn]);

  return (
    <Router>
      <div
        className={
          showForm
            ? "relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:z-30 before:bg-slate-950/40"
            : ""
        }
      >
        <Navbar />
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Home />} />
            <Route path="/order" element={<Home />} />
            <Route path="/orders" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

import { Search } from "lucide-react";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setIsLoggedIn, setShowForm } from "../redux/auth";
import { RootState } from "../redux/store";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getCookie from "../functions/getCookie";
import { setNumOfItems } from "../redux/cart";
import isUserLoggedIn from "../functions/isUserLoggedIn";
import axios from "axios";

function Navbar() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;
  const dispatch = useDispatch();

  const { numOfItems } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleNavbar = async () => {
      if (await isUserLoggedIn()) {
        dispatch(setIsLoggedIn());
        setNumberOfCartItems();
        return;
      } else {
        generateSessionAndCsrfToken();
      }
    };

    handleNavbar();
  }, [isLoggedIn]);

  async function generateSessionAndCsrfToken() {
    try {
      await axios.get(`${apiHost}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function setNumberOfCartItems() {
    try {
      const response = await axios.get(`${apiHost}/api/number-of-cart-items`, {
        withCredentials: true,
      });

      dispatch(setNumOfItems(response.data.numberOfItems));
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function logout() {
    await axios.post(
      `${apiHost}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
        },
      }
    );

    window.location.pathname = "/";
  }

  return (
    <nav>
      <div className="container mx-auto px-2 sm:px-0">
        <div className="flex justify-between py-5">
          <h1 className="text-3xl text-orange-600 font-bold">Tomato.</h1>
          <ul className="hidden sm:flex gap-x-3">
            <li>
              <Link to="/" className="hover:underline transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline transition-all">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline transition-all">
                Mobile App
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline transition-all">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-x-3">
            <button>
              <Search className="text-indigo-900 hover:text-indigo-950" />
            </button>
            <Link to="/cart" className="flex items-end">
              <FaBagShopping className="text-2xl text-indigo-900 hover:text-indigo-950" />
              {numOfItems > 0 && (
                <span className="flex justify-center items-center text-xs p-px px-1.5 rounded-full bg-orange-600 text-white  -ml-2 -mb-2">
                  {numOfItems}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="block rounded-full bg-transparent hover:bg-indigo-100 transition-colors border border-indigo-900 text-indigo-900 p-2"
                >
                  <FaUser />
                </button>
                <ul
                  className={`${
                    showDropdown ? "block" : "hidden"
                  } absolute bg-white shadow-xl rounded-lg z-50 right-0 top-12`}
                >
                  <li>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="inline-block px-10 py-1 font-light hover:bg-neutral-200 transition-colors"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowDropdown(false)}
                      to="/orders"
                      className="inline-block px-10 py- font-light hover:bg-neutral-200 transition-colors"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                      }}
                      className="inline-block px-10 py-1 font-light hover:bg-neutral-200 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="block rounded-full bg-transparent hover:bg-indigo-100 transition-colors border border-indigo-900 text-indigo-900 px-6 py-1"
                onClick={() => dispatch(setShowForm())}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

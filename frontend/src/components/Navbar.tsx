import { Search } from "lucide-react";
import { FaBagShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setIsLoggedIn, setShowForm } from "../redux/auth";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function Navbar() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const dispatch = useDispatch();

  const { numOfItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   fetch(`${apiHost}/api/user`, { credentials: "include" })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       dispatch(setIsLoggedIn(true));
  //       console.log(data);
  //     })
  //     .catch(() => dispatch(setIsLoggedIn(false)));
  // }, []);

  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex justify-between py-5">
          <h1 className="text-3xl text-orange-600 font-bold">Tomato.</h1>
          <ul className="flex gap-x-3">
            <li>
              <a href="#" className="hover:underline transition-all">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition-all">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition-all">
                Mobile App
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline transition-all">
                Contact As
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-x-3">
            <button>
              <Search className="text-indigo-900 hover:text-indigo-950" />
            </button>
            <button className="flex items-end">
              <FaBagShopping className="text-2xl text-indigo-900 hover:text-indigo-950" />
              {numOfItems > 0 ? (
                <span className="flex justify-center items-center text-xs p-px px-1.5 rounded-full bg-orange-600 text-white  -ml-2 -mb-2">
                  {numOfItems}
                </span>
              ) : (
                ""
              )}
            </button>
            {isLoggedIn ? (
              <button className="block rounded-full bg-transparent hover:bg-indigo-100 transition-colors border border-indigo-900 text-indigo-900 p-2">
                <FaUser />
              </button>
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

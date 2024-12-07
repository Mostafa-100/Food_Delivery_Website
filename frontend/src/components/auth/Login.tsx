import {
  setIsLoggedIn,
  setShowForm,
  setShowLogin,
  setShowSignup,
} from "../../redux/auth";
import { useReducer, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import getCookie from "../../functions/getCookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface stateProps {
  emailErrorMessage: null;
  passwordErrorMessage: null;
}

function reducer(state: stateProps, action: { type: string; payload: string }) {
  switch (action.type) {
    case "setEmailError":
      return {
        ...state,
        emailErrorMessage: action.payload,
      };
    case "setPasswordError":
      return {
        ...state,
        passwordErrorMessage: action.payload,
      };
    case "resetFormErrors":
      return {
        ...state,
        emailErrorMessage: null,
        passwordErrorMessage: null,
      };
    default:
      return state;
  }
}

function Login() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const dispatch = useDispatch();

  const [state, reducerDispatch] = useReducer(reducer, {
    emailErrorMessage: null,
    passwordErrorMessage: null,
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    const formData = new FormData(e.target);

    setLoading(true);
    e.preventDefault();

    const response = await fetch(`${apiHost}/login`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
      },
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      const formErrors = errorData.errors;

      reducerDispatch({ type: "resetFormErrors" });

      if (Object.prototype.hasOwnProperty.call(formErrors, "email")) {
        reducerDispatch({
          type: "setEmailError",
          payload: formErrors.email[0],
        });
      }

      if (Object.prototype.hasOwnProperty.call(formErrors, "password")) {
        reducerDispatch({
          type: "setPasswordError",
          payload: formErrors.password[0],
        });
      }
    } else {
      dispatch(setIsLoggedIn());
      dispatch(setShowForm());
      dispatch(setShowLogin());
    }

    setLoading(false);
  }

  return (
    <div className="absolute left-0 top-0 h-lvh w-full z-30 grid place-items-center mt-2">
      <form
        className="bg-white rounded-lg p-8 w-full max-w-96 space-y-6 mx-3 md:mx-0"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Login</div>
          <button
            className="hover:bg-slate-100 p-1 rounded-full transition-colors"
            type="button"
            onClick={() => dispatch(setShowForm())}
          >
            <IoCloseSharp className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {state.emailErrorMessage && (
              <div className="text-sm text-red-500">
                {state.emailErrorMessage}
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {state.passwordErrorMessage && (
              <div className="text-sm text-red-500">
                {state.passwordErrorMsg}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-x-1 text-white py-2 rounded-lg ${
              loading
                ? "bg-neutral-500 pointer-events-none"
                : "bg-orange-600 hover:bg-orange-700"
            } transition-colors`}
          >
            Login
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin ease-linear text-sm" />
            ) : (
              <></>
            )}
          </button>
          <div className="text-sm text-center">
            Create a new account?{" "}
            <button
              className="text-orange-600 hover:underline"
              onClick={() => dispatch(setShowSignup())}
              type="button"
            >
              Click here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

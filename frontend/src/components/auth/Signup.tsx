import { setShowForm, setShowLogin } from "../../redux/auth";
import { useState, useReducer } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCircleCheck } from "react-icons/fa6";
import getCookie from "../../functions/getCookie";

interface stateProps {
  nameErrorMessage: null;
  emailErrorMessage: null;
  passwordErrorMessage: null;
}

function reducer(state: stateProps, action: { type: string; payload: string }) {
  switch (action.type) {
    case "setNameError":
      return {
        ...state,
        nameErrorMessage: action.payload,
      };
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
        nameErrorMessage: null,
        emailErrorMessage: null,
        passwordErrorMessage: null,
      };
    default:
      return state;
  }
}

function Signup() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const [state, reducerDispatch] = useReducer(reducer, {
    nameErrorMessage: null,
    emailErrorMessage: null,
    passwordErrorMessage: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    formData.append("password_confirmation", formData.get("password") || "");

    const response = await fetch(`${apiHost}/register`, {
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

      if (Object.prototype.hasOwnProperty.call(formErrors, "name")) {
        reducerDispatch({
          type: "setNameError",
          payload: formErrors.name[0],
        });
      }

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
      setSuccess(true);
    }

    setLoading(false);
  }

  return (
    <div className="absolute left-0 top-0 h-lvh w-full z-30 grid place-items-center mt-2">
      <form
        className="bg-white rounded-lg p-8 max-w-96 space-y-6 mx-3 md:mx-0"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Sign up </div>
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
              type="text"
              name="name"
              placeholder="Your name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                state.nameErrorMessage
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
            />
            {state.nameErrorMessage && (
              <div className="text-sm text-red-500">
                {state.nameErrorMessage}
              </div>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none  ${
                state.emailErrorMessage
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none  ${
                state.passwordErrorMessage
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
            />
            {state.passwordErrorMessage && (
              <div className="text-sm text-red-500">
                {state.passwordErrorMessage}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-x-1 text-white py-2 rounded-lg transition-colors ${
              loading
                ? "bg-neutral-500 pointer-events-none"
                : `${
                    success
                      ? "bg-green-500 pointer-events-none"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`
            } transition-colors`}
          >
            {success ? "You can log in now" : "Create account"}
            {loading && (
              <AiOutlineLoading3Quarters className="animate-spin ease-linear text-sm" />
            )}
            {success && <FaRegCircleCheck className="text-sm" />}
          </button>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" required />
            <label htmlFor="checkbox" className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
          <div className="text-sm text-center">
            Already have an account?{" "}
            <button
              className="text-orange-600 hover:underline"
              onClick={() => dispatch(setShowLogin())}
              type="button"
            >
              Login here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;

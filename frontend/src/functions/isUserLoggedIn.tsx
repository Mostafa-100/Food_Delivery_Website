import axios from "axios";
import getCookie from "./getCookie";

async function isUserLoggedIn() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  try {
    await axios.get(`${apiHost}/api/user`, {
      withCredentials: true,
      headers: {
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export default isUserLoggedIn;

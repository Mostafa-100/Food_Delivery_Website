import { useLocation } from "react-router-dom";
import OrderInput from "../components/OrderInput";
import getCookie from "../functions/getCookie";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCircleCheck } from "react-icons/fa6";
import axios from "axios";

function Order() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const { state } = useLocation();

  const { total } = state;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const paymentUrl = await checkout();

      await axios.post(`${apiHost}/api/orders`, formData, {
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
        },
        withCredentials: true,
      });

      window.location.href = paymentUrl;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data);
      } else {
        console.error(error);
      }
    }
  }

  async function checkout() {
    try {
      const response = await axios.get(`${apiHost}/api/checkout`, {
        withCredentials: true,
      });

      const data = response.data;

      setIsLoading(false);
      setIsSuccess(true);

      return data.url;
    } catch (error) {
      throw await error.response.data;
    }
  }

  return (
    <div className="container mx-auto mt-12 px-2 sm:px-0 py-3">
      <form
        className="flex flex-col sm:flex-row gap-y-10 sm:gap-y-0 gap-x-60"
        onSubmit={submitForm}
      >
        <div className="grow">
          <h2 className="text-2xl font-medium mb-7">Delivery Information</h2>
          <div className="flex gap-3 flex-col">
            <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 gap-x-3">
              <OrderInput
                type="text"
                name="firstName"
                placeholder="First name"
              />
              <OrderInput type="text" name="lastName" placeholder="Last name" />
            </div>
            <OrderInput type="email" name="email" placeholder="Email addres" />
            <OrderInput type="text" name="street" placeholder="Street" />
            <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 gap-x-3">
              <OrderInput type="text" name="city" placeholder="City" />
              <OrderInput type="text" name="state" placeholder="State" />
            </div>
            <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 gap-x-3">
              <OrderInput type="text" name="zipCode" placeholder="Zip code" />
              <OrderInput type="text" name="country" placeholder="Country" />
            </div>
            <OrderInput type="phone" name="phone" placeholder="Phone" />
          </div>
        </div>
        <div className="grow">
          <div>
            <div>
              <div className="font-bold text-xl">Cart Totals</div>
              <hr />
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">Delivery Fee</span>
                <span className="text-neutral-500">39$</span>
              </div>
              <hr />
              <div className="flex justify-between py-2">
                <span className="text-neutral-500 font-semibold">Total</span>
                <span className="text-neutral-500">{total}</span>
              </div>
              <button
                className={`${
                  isLoading
                    ? "bg-neutral-500 pointer-events-none"
                    : isSuccess
                    ? "bg-green-600 pointer-events-none"
                    : "bg-orange-600 hover:bg-orange-700"
                } transition-colors text-white text-sm py-2 px-5 rounded-sm flex items-center justify-center gap-x-1`}
              >
                {isLoading
                  ? "PLEASE WAIT"
                  : isSuccess
                  ? "YOU CAN PAY NOW"
                  : "PROCEED TO CHECKOUT"}
                {isLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin ease-linear text-sm" />
                )}
                {isSuccess && <FaRegCircleCheck className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Order;

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Order from "../components/Order";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

interface OrderProps {
  id: number;
  description: string;
  montant: number;
  numberOfItems: number;
  status: string;
}

function Orders() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sessionCheckoutId = useRef("");

  useEffect(() => {
    if (searchParams.has("checkout_session_id")) {
      sessionCheckoutId.current = searchParams.get("checkout_session_id") ?? "";
      searchParams.delete("checkout_session_id");
      setSearchParams(searchParams);
    }

    axios
      .get(`${apiHost}/api/orders`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setOrders(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }, [searchParams]);

  return (
    <>
      <div className="container mx-auto py-5 px-2 md:px-0 h-[calc(100vh-76px)]">
        <div>
          <h2 className="text-2xl mb-6">My Orders</h2>
          <div>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl text-neutral-600" />
            ) : orders.length > 0 ? (
              orders?.map((order: OrderProps) => (
                <Order key={order.id} {...order} />
              ))
            ) : (
              <div className="text-neutral-500 text-center text-lg">
                You dont have any order yet.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;

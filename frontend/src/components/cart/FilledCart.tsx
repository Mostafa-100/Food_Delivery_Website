import { useState, useEffect } from "react";
import getCookie from "../../functions/getCookie";
import { useDispatch } from "react-redux";
import { decrementNumOfItems } from "../../redux/cart";
import { Link } from "react-router-dom";
import axios from "axios";

interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  numberOfStars: number;
  snippet: string;
  price: number;
  pivot: {
    quantity: number;
    total: number;
  };
}

function FilledCart() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiHost}/api/cart-items`, {
        withCredentials: true,
      })
      .then((response) => {
        const total = (
          response.data?.reduce(
            (acc: number, curr: CartItemProps) => curr.pivot.total + acc,
            0
          ) + 39
        ).toFixed(2);

        setTotal(total);
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error when fetching cart items:", error.response.data);
      });
  }, []);

  async function removeCartItem(id: number) {
    try {
      const response = await axios.delete(
        `${apiHost}/api/remove-cart-item/${id}`,
        {
          headers: {
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          },
          withCredentials: true,
        }
      );

      dispatch(decrementNumOfItems());

      const data = await response.data;

      const total = (
        data?.reduce(
          (acc: number, curr: CartItemProps) => curr.pivot.total + acc,
          0
        ) + 39
      ).toFixed(2);

      setTotal(total);
      setCartItems(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error removing cart item:", error.response.data);
      } else {
        console.error("Error removing cart item:", error);
      }
    }
  }

  return (
    <>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="py-3 text-slate-500">Items</th>
            <th className="py-3 text-slate-500">Title</th>
            <th className="py-3 text-slate-500">Price</th>
            <th className="py-3 text-slate-500">Quantity</th>
            <th className="py-3 text-slate-500">Total</th>
            <th className="py-3 text-slate-500">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item: CartItemProps) => (
            <tr className="border-t border-slate-300 text-center" key={item.id}>
              <td className="p-2 flex justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="size-14 object-cover rounded-full"
                />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.pivot.quantity}</td>
              <td>${item.pivot.total}</td>
              <td>
                <button
                  className="font-bold text-sm inline-block bg-red-500 hover:bg-transparent transition-colors px-2 border-2 border-red-500 rounded-full text-white cursor-pointer hover:text-red-500"
                  onClick={() => removeCartItem(item.id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 md:gap-x-52">
        <div className="grow">
          <div>
            <div className="font-bold text-xl">Cart Totals</div>
            <hr />
            <div className="flex justify-between py-2">
              <span className="text-neutral-500">Delivery Fee</span>
              <span className="text-neutral-500">$39</span>
            </div>
            <hr />
            <div className="flex justify-between py-2">
              <span className="text-neutral-500 font-semibold">Total</span>
              <span className="text-neutral-500">${total}</span>
            </div>
            <Link
              to="/order"
              state={{ total }}
              className="bg-orange-600 hover:bg-orange-700 text-nowrap transition-colors text-white text-sm py-2 px-5 rounded-sm"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
        <div className="grow">
          <div>
            <div>If you have a promo code, Enter it here</div>
            <form
              className="flex flex-col sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="promo code"
                className="py-3 px-2 bg-neutral-300 grow"
              />
              <button type="submit" className="py-3 px-14 text-white bg-black">
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilledCart;

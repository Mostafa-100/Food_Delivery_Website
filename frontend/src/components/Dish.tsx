import { Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { incrementNumOfItems } from "../redux/cart";
import { useEffect, useState } from "react";
import getCookie from "../functions/getCookie";
import { RootState } from "../redux/store";
import axios from "axios";

interface DishProps {
  id: number;
  imageUrl: string;
  name: string;
  numberOfStars: number;
  snippet: string;
  price: number;
  inCart: boolean;
  quantity: number;
}

function makeStars(numOfStars: number) {
  const stars = [1, 2, 3, 4, 5].map((number, index) => {
    if (number > numOfStars) return <CiStar key={index} />;
    return <FaStar className="text-yellow-500" key={index} />;
  });
  return stars;
}

function Dish(props: DishProps) {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;

  const [numOfItem, setNumOfItem] = useState(1);
  const [showItemCounter, setShowItemCounter] = useState(false);

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (props.quantity) {
      setNumOfItem(props.quantity);
    }
  }, [isLoggedIn]);

  async function addToCart(id: number) {
    try {
      await axios.post(
        `${apiHost}/api/add-to-cart`,
        { dishId: id },
        {
          withCredentials: true,
          headers: {
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
          },
        }
      );

      dispatch(incrementNumOfItems());
      setShowItemCounter(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  }

  async function editItemQuantity(id: number, quantity: number) {
    try {
      await axios.post(
        `${apiHost}/api/edit-quantity`,
        {
          dishId: id,
          quantity: quantity,
        },
        {
          withCredentials: true,
          headers: {
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
          },
        }
      );
      setNumOfItem((prev) => prev + quantity);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div className="shadow-md px-2 md:px-0">
      <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <img
          src={props.imageUrl}
          className="h-64 w-full object-cover rounded-tl-2xl rounded-tr-2xl hover:scale-125 hover:rotate-6 transition-all ease-linear"
        />
        <div className="absolute right-4 bottom-4">
          {showItemCounter || props.inCart ? (
            <div className="flex items-center gap-x-2 bg-white rounded-full p-2">
              <button
                className="flex items-center justify-center size-8 p-2 rounded-full bg-red-300 text-red-500"
                onClick={() => editItemQuantity(props.id, -1)}
              >
                -
              </button>
              <div className="font-medium">{numOfItem}</div>
              <button
                className="flex items-center justify-center size-8 p-2 rounded-full bg-green-300 text-green-500"
                onClick={() => editItemQuantity(props.id, 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className=" bg-white hover:bg-neutral-300 transition-colors p-3 rounded-full"
              onClick={() => addToCart(props.id)}
            >
              <Plus className="size-4" />
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl text-slate-900 font-medium">{props.name}</h3>
          <div className="flex gap-px">{makeStars(props.numberOfStars)}</div>
        </div>
        <div className="text-sm text-slate-500">{props.snippet}</div>
        <div className="text-orange-500 text-2xl font-medium">
          ${props.price}
        </div>
      </div>
    </div>
  );
}

export default Dish;

import { Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { incrementNumOfItems } from "../redux/cart";
import { useState } from "react";

interface DishProps {
  id: number;
  imageUrl: string;
  name: string;
  numOfStars: number;
  snippet: string;
  price: number;
  key?: number;
}

function makeStars(numOfStars: number) {
  const stars = [1, 2, 3, 4, 5].map((number, index) => {
    if (number > numOfStars) return <CiStar key={index} />;
    return <FaStar className="text-yellow-500" key={index} />;
  });
  return stars;
}

function Dish({ id, imageUrl, name, numOfStars, snippet, price }: DishProps) {
  const [numOfItem, setNumOfItem] = useState(1);
  const [showItemCounter, setShowItemCounter] = useState(false);

  const dispatch = useDispatch();

  function addToCart(id) {
    dispatch(incrementNumOfItems());
    setShowItemCounter(true);
  }

  return (
    <div className="shadow-md px-2 md:px-0">
      <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <img
          src={imageUrl}
          className="h-64 w-full object-cover rounded-tl-2xl rounded-tr-2xl hover:scale-125 hover:rotate-6 transition-all ease-linear"
        />
        <div className="absolute right-4 bottom-4">
          {showItemCounter ? (
            <div className="flex items-center gap-x-2 bg-white rounded-full p-2">
              <button
                className="flex items-center justify-center size-8 p-2 rounded-full bg-red-300 text-red-500"
                onClick={() =>
                  setNumOfItem((prev) => {
                    return prev > 1 ? prev - 1 : prev;
                  })
                }
              >
                -
              </button>
              <div className="font-medium">{numOfItem}</div>
              <button
                className="flex items-center justify-center size-8 p-2 rounded-full bg-green-300 text-green-500"
                onClick={() => setNumOfItem((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className=" bg-white hover:bg-neutral-300 transition-colors p-3 rounded-full"
              onClick={() => addToCart(id)}
            >
              <Plus className="size-4" />
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl text-slate-900 font-medium">{name}</h3>
          <div className="flex gap-px">{makeStars(numOfStars)}</div>
        </div>
        <div className="text-sm text-slate-500">{snippet}</div>
        <div className="text-orange-500 text-2xl font-medium">${price}</div>
      </div>
    </div>
  );
}

export default Dish;

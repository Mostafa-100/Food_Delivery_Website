import { Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

interface DishProps {
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

function Dish({ imageUrl, name, numOfStars, snippet, price }: DishProps) {
  return (
    <div className="shadow-md">
      <div className="relative">
        <img
          src={imageUrl}
          className="h-64 w-full object-cover rounded-tl-2xl rounded-tr-2xl"
        />
        <button className="absolute right-4 bottom-4 bg-white hover:bg-neutral-300 transition-colors p-3 rounded-full">
          <Plus className="size-4" />
        </button>
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

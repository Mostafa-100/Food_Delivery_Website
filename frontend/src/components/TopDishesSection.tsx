import Dish from "./Dish";
import { useState, useEffect } from "react";

interface DishProps {
  id: number;
  imageUrl: string;
  name: string;
  numOfStars: number;
  snippet: string;
  price: number;
}

function TopDishes() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(`${apiHost}/api/dishes`)
      .then((response) => response.json())
      .then((data) => setDishes(data));
  });

  return (
    <div className="py-9">
      <div className="container mx-auto">
        <div>
          <h2 className="text-center md:text-left text-3xl font-medium text-slate-900 mb-4">
            Top dishes near you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish: DishProps) => (
              <Dish key={dish.id} {...dish} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopDishes;

import { useSelector } from "react-redux";
import Dish from "./Dish";
import { useState, useEffect } from "react";
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

function TopDishesSection() {
  const apiHost = import.meta.env.VITE_LARAVEL_API_URL;
  const [dishes, setDishes] = useState([]);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    axios
      .get(`${apiHost}/api/dishes`, {
        withCredentials: true,
      })
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error in fetching items", error.response.data);
        }
        console.error("Error in fetching items", error);
      });
  }, [isLoggedIn]);

  return (
    <div className="py-9">
      <div className="container mx-auto">
        <div>
          <h2 className="text-center md:text-left text-3xl font-medium text-slate-900 mb-4">
            Top dishes near you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes?.map((dish) => (
              <Dish key={(dish as DishProps).id} {...(dish as DishProps)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopDishesSection;

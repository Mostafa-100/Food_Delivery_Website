import Dish from "./Dish";

interface DishProps {
  imageUrl: string;
  name: string;
  numOfStars: number;
  snippet: string;
  price: number;
}

function TopDishes() {
  const dishes: DishProps[] = [
    {
      imageUrl: "dishes/1.jpg",
      name: "Greek salade",
      numOfStars: 3,
      snippet: "lorem ipsum dolor and other things",
      price: 8.99,
    },
    {
      imageUrl: "dishes/2.jpg",
      name: "Greek pasta",
      numOfStars: 4,
      snippet: "lorem ipsum dolor and other things",
      price: 14.0,
    },
    {
      imageUrl: "dishes/3.jpg",
      name: "sandwich for humans",
      numOfStars: 3,
      snippet: "lorem ipsum dolor and other things",
      price: 12.0,
    },
    {
      imageUrl: "dishes/4.jpg",
      name: "Tacos of mexic",
      numOfStars: 5,
      snippet: "lorem ipsum dolor and other things",
      price: 18.0,
    },
    {
      imageUrl: "dishes/5.jpg",
      name: "Burgur of america",
      numOfStars: 2,
      snippet: "lorem ipsum dolor and other things",
      price: 99.99,
    },
    {
      imageUrl: "dishes/6.jpg",
      name: "Tajine of maroc",
      numOfStars: 3,
      snippet: "lorem ipsum dolor and other things",
      price: 9.99,
    },
    {
      imageUrl: "dishes/7.jpg",
      name: "Pizza of italian",
      numOfStars: 3,
      snippet: "lorem ipsum dolor and other things",
      price: 13.0,
    },
    {
      imageUrl: "dishes/8.jpg",
      name: "Sushi of chine",
      numOfStars: 1,
      snippet: "lorem ipsum dolor and other things",
      price: 14.99,
    },
  ];
  return (
    <div className="py-4">
      <div className="container mx-auto">
        <div>
          <h2 className="text-3xl font-medium text-slate-900 mb-4">
            Top dishes near you
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {dishes.map((dish: DishProps, index: number) => (
              <Dish key={index} {...dish} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopDishes;

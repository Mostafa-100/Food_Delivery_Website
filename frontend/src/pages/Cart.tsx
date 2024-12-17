import { useSelector } from "react-redux";
import FilledCart from "../components/cart/FilledCart";
import EmptyCart from "../components/cart/EmptyCart";
import { RootState } from "../redux/store";

function Cart() {
  const { numOfItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="container mx-auto py-5 px-2 sm:px-0">
      <h2 className="text-2xl mb-6">My Cart</h2>
      {numOfItems > 0 ? <FilledCart /> : <EmptyCart />}
    </div>
  );
}

export default Cart;

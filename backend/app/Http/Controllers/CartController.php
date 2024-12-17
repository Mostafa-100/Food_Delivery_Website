<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Dish;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'dishId' => 'required|exists:dishes,id',
        ]);

        $dishId = $request->input('dishId');

        $cart = $request->user()?->cart ?? Cart::create(['user_id' => $request->user()->id]);

        $item = Dish::where('id', $dishId)->first();

        $cart->dishes()->syncWithoutDetaching([
            $dishId => [
            'total' => $item->price,
        ]]);

        return response()->json([
         'success' => 'The item is added to cart',
        ]);
    }

    public function editQuantity(Request $request)
    {
        $request->validate([
            'dishId' => 'required|exists:dishes,id',
            'quantity' => 'required|integer',
        ]);

        $dishId = $request->input('dishId');
        $quantity = $request->input('quantity');

        $cart = $request->user()->cart;
        $dish = $cart->dishes()->where('dish_id', $dishId)->first();

        if (!$dish) {
            return response()->json(['error' => 'Dish not found in cart'], 404);
        }

        $cart->dishes()->updateExistingPivot($dishId, [
            'quantity' => $dish->pivot->quantity + $quantity,
            'total' => ($dish->pivot->quantity + $quantity) * $dish->price,
        ]);

        return response()->json(['success' => 'Quantity updated successfully']);
    }

    public function getCartItems(Request $request)
    {
        $baseUrl = env("APP_URL") . "/storage/dishes/";
        $cartItems = $request->user()->cart->dishes;

        foreach($cartItems as $cartItem) {
            $cartItem->imageUrl = $baseUrl . $cartItem->imageUrl;
        }

        return $cartItems;
    }

    public function removeCartItem(Request $request, $id)
    {

        $cart = $request->user()->cart;

        $cart->dishes()->detach($id);

        return $this->getCartItems($request);
    }

    public function getNumberOfItems(Request $request) {
        $numberOfItems = $request->user()?->cart?->dishes?->count();
        
        if(is_null($numberOfItems)) {
          return response()->json([
            'error' => 'Cart is empty',
          ], 404);
        }

        return response()->json([
            'numberOfItems' => $numberOfItems
        ]);
    }
}

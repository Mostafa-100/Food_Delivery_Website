<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index(Request $request)
    {
        $baseUrl = env("APP_URL") . "/storage/dishes/";
        $dishes = Dish::all();
        $cart = $request->user()?->cart;

        foreach($dishes as $dish) {
            if(!$cart?->get()?->isEmpty() && $cart?->dishes?->contains('pivot.dish_id', $dish->id)) {
                $dish->inCart = true;
                $dish->quantity = $cart->dishes->where('pivot.dish_id', $dish->id)->first()->pivot->quantity;
            } else {
                $dish->inCart = false;
            }

            $dish->imageUrl = $baseUrl . $dish->imageUrl;
        }
        
        /* Do caching, redis or client side caching */
        return $dishes;
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}

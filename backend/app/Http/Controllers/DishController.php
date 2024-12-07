<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index()
    {
        $baseUrl = "http://127.0.0.1:8000/storage/dishes/";
        $dishes = Dish::all();

        foreach($dishes as $dish) {
            $dish->imageUrl = $baseUrl . $dish->imageUrl;
        }
        
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

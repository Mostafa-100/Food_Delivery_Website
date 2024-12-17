<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Dish;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = [
            ["name" => "Salad"],
            ["name" => "Cake"],
            ["name" => "Desserts"],
            ["name" => "Pasta"],
            ["name" => "Pure Veg"],
            ["name" => "Rolls"],
            ["name" => "Sandwich"],
            ["name" => "Noodles"],
        ];

        foreach($categories as $category) {
            DB::table('categories')->insert($category);
        }

        $dishes = [
            ["name" => "Greek Salad", "price" => 4.99, "numberOfStars" => 4, "imageUrl" => "1.jpg", "category_id" => Category::where('name', 'Salad')->first()->id],
            ["name" => "Greek Pasta", "price" => 16.99, "numberOfStars" => 3, "imageUrl" => "2.jpg", "category_id" => Category::where('name', 'Pasta')->first()->id],
            ["name" => "Classic Sandwich", "price" => 7.99, "numberOfStars" => 2, "imageUrl" => "3.jpg", "category_id" => Category::where('name', 'Sandwich')->first()->id],
            ["name" => "Mexican Tacos", "price" => 44.99, "numberOfStars" => 5, "imageUrl" => "4.jpg", "category_id" => Category::where('name', 'Rolls')->first()->id],
            ["name" => "American Burger", "price" => 9.99, "numberOfStars" => 3, "imageUrl" => "5.jpg", "category_id" => Category::where('name', 'Sandwich')->first()->id],
            ["name" => "Moroccan Tajine", "price" => 10.99, "numberOfStars" => 5, "imageUrl" => "6.jpg", "category_id" => Category::where('name', 'Pure Veg')->first()->id],
            ["name" => "Italian Pizza", "price" => 14.99, "numberOfStars" => 4, "imageUrl" => "7.jpg", "category_id" => Category::where('name', 'Pure Veg')->first()->id],
            ["name" => "Chinese Sushi", "price" => 13.99, "numberOfStars" => 4, "imageUrl" => "8.jpg", "category_id" => Category::where('name', 'Rolls')->first()->id],
        ];
        
        foreach($dishes as $dish) {
            DB::table('dishes')->insert([...$dish, ...["snippet" => "lorem ipsum dolor and other things"]]);
        }
    }
}

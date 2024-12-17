<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('dishes', DishController::class)->except(['index'])->middleware((['auth:sanctum']));
Route::apiResource('dishes', DishController::class)->only(['index']);

Route::middleware(['auth:sanctum'])->post('/add-to-cart', [CartController::class, 'addToCart']);
Route::middleware(['auth:sanctum'])->post('/edit-quantity', [CartController::class, 'editQuantity']);
Route::middleware(['auth:sanctum'])->get('/cart-items', [CartController::class, 'getCartItems']);
Route::middleware(['auth:sanctum'])->delete('/remove-cart-item/{id}', [CartController::class, 'removeCartItem']);
Route::middleware(['auth:sanctum'])->get('/number-of-cart-items', [CartController::class, 'getNumberOfItems']);

Route::middleware(['auth:sanctum'])->get('/checkout', [OrderController::class, 'checkout']);
Route::middleware(['auth:sanctum'])->get('/orders', [OrderController::class, 'index']);
Route::middleware(['auth:sanctum'])->post('/orders', [OrderController::class, 'store']);

// Route::get('/test', function(Request $request) {
//     Session::put('hey', 'Hey everyone');
// });

// Route::get('/another-test', function(Request $request) {
//     return Session::get('hey');
// });
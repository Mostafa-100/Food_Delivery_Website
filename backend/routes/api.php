<?php

use App\Http\Controllers\DishController;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users', function(Request $request) {
    return $request->all();
});

Route::apiResource('dishes', DishController::class);
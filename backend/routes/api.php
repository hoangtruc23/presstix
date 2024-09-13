<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'index']);
Route::post('/auth/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->get('/auth/profile',[AuthController::class,'profile']);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\EventCategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'index']);
Route::post('/auth/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->get('/auth/profile',[AuthController::class,'profile']);


// EVENT 
Route::get('/event-cate',[EventCategoryController::class,'index']);
Route::get('/events',[EventController::class,'index']);
Route::get('/event/{slug}',[EventController::class,'show'])->name('event.show');

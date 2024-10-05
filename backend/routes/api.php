<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ManageEventController;
use App\Http\Controllers\Admin\ManageUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\EventCategoryController;



// Route::get('/user', [UserController::class, 'index']);
// Route::post('/auth/login',[AuthController::class,'login']);




// EVENT 
Route::get('/event-cate',[EventCategoryController::class,'index']);

Route::get('/events',[EventController::class,'index']);
Route::get('/event/{slug}',[EventController::class,'show'])->name('event.show');

// ADMIN
// Route::get('/admin',[UserController::class,'index']);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login',[AuthController::class,'login'])->name('login');
Route::middleware('auth:sanctum')->get('/auth/profile',[AuthController::class,'profile']);

Route::middleware(['auth:sanctum','rolemanager:admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::controller(AdminController::class)->group(function () {
            Route::get('/', 'index')->name('admin');     
        });
        Route::controller(ManageUserController::class)->group(function () {
            Route::get('/user', 'index')->name('admin.user');     
        });
        Route::controller(ManageEventController::class)->group(function () {
            Route::get('/event', 'index')->name('admin.event');     
        });
    });
});


Route::middleware(['auth:sanctum','rolemanager:organize'])->group(function () {
    // Route::prefix('admin')->group(function () {
    //     Route::controller(AdminController::class)->group(function () {
    //         Route::get('/', 'index')->name('admin');     
    //     });
    //     Route::controller(ManageUserController::class)->group(function () {
    //         Route::get('/user', 'index')->name('admin.user');     
    //     });
    // });
});


<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ManageEventController;
use App\Http\Controllers\Admin\ManageUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\EventCategoryController;
use App\Http\Controllers\API\InvoiceController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\WebhookController;
use App\Http\Controllers\Organize\EventController as OrganizeEventController;
use Illuminate\Support\Facades\Auth;

// EVENT 
Route::get('/event-cate', [EventCategoryController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/event/{slug}', [EventController::class, 'show'])->name('event.show');

//PAYMENT
Route::post('/webhook-event-handler', [PaymentController::class, 'handleBankTransfer']);
Route::post('/sync-bank', [PaymentController::class, 'sync']);
Route::get('/transaction', [PaymentController::class, 'handleTransation']);
Route::get('/transaction/{id}', [PaymentController::class, 'handleTransation']);

Route::post('/payment/guest', [InvoiceController::class, 'handleInvoice']);

// EVENT ORGANIZE
Route::get('/event-list/{email}', [OrganizeEventController::class, 'getEventsByUserId'])->name('event.user');
Route::post('/create-event', [EventController::class, 'store'])->name('create.event');

Route::put('/event-update/{id}', [EventController::class, 'update'])->name('event.update');

// TICKET 
Route::post('/create-ticket', [TicketController::class, 'store'])->name('create.ticket');


// // ADMIN
// Route::controller(EventController::class)->group(function () {
//     Route::put('/event-update/{id}', 'update')->name('event.update');
// });


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ticket-success-user', [TicketController::class, 'getTicketSuccess']);
    Route::post('/payment', [InvoiceController::class, 'handleInvoice']);
    Route::get('/invoices', [InvoiceController::class, 'getInvoiceByUser']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
});

Route::middleware(['auth:sanctum', 'rolemanager:admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::controller(AdminController::class)->group(function () {
            Route::get('/', 'index')->name('admin');
        });
        Route::controller(ManageUserController::class)->group(function () {
            Route::get('/user', 'index')->name('admin.user');
        });
        Route::controller(ManageEventController::class)->group(function () {
            Route::get('/events', 'index');
            Route::delete('/events/{id}', 'destroy');
        });
    });
});



<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ManageEventController;
use App\Http\Controllers\Admin\ManageStatisticsController;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Admin\ManageWithdrawalController;
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
use App\Http\Controllers\Organize\OrganizerController;
use App\Http\Controllers\Organize\WithdrawalController;
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
Route::put('/event-update-status/{id}', [EventController::class, 'updateStatusEvent']);
Route::get('/organizers/update-wallet', [OrganizerController::class, 'updateWallet']);


// TICKET 
Route::post('/create-ticket', [TicketController::class, 'store'])->name('create.ticket');


// ADMIN
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth/signup', [AuthController::class, 'signup']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/withdrawal-request', [WithdrawalController::class, 'store']);
    Route::post('/organizer', [OrganizerController::class, 'index']);
    Route::post('/organizer-update', [OrganizerController::class, 'update']);
    Route::post('/organizer-update-banking', [OrganizerController::class, 'updateInfoBanking']);
    Route::post('/ticket-success-user', [TicketController::class, 'getTicketSuccess']);
    Route::post('/ticket-cancelled-user', [TicketController::class, 'getTicketCancelled']);
    Route::post('/ticket-cancelled', [TicketController::class, 'postTicketCanncelled']);
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
        Route::controller(ManageWithdrawalController::class)->group(function () {
            Route::post('/withdrawal', 'index');
        });
        Route::controller(ManageStatisticsController::class)->group(function () {
            Route::post('/ticket-statistics', 'Ticket_Statistics');
        });
    });
});

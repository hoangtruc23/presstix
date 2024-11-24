<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function handleInvoice(Request $request)
    {

        // $request->validate([
        // ]);

        $user = Auth::check() ? Auth::user() : null;

        $invoice = new Invoice();
        $invoice->invoice_date = now();
        $invoice->amount = $request['amount'];
        $invoice->email = $request['email'];
        $invoice->phone = $request['phone'];
        $invoice->description = $request['description'];
        if ($user) {
            $invoice->user_id = $user->id;
        } else {
            $invoice->user_id = null;
        }
        $invoice->save();
        return response()->json([
            'success' => true,
            'invoice' => $invoice,
        ]);
    }

    public function getInvoiceByUser(Request $request)
    {
        $user_id = Auth::id();

        $invoices = Invoice::where('user_id', $user_id)
        ->orderBy('created_at','desc')
        ->get();
    
        return response()->json([
            'success' => true,
            'invoices' => $invoices,
        ]);
    }
}

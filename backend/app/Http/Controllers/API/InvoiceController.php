<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use DateTime;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function handleInvoice(Request $request)
    {

        // $request->validate([
        // ]);
        $request['amount'] = 5000;

        $invoice = new Invoice();
        $invoice->invoice_date = new DateTime().now();
        $invoice->amount = $request['amount'];
      
        $invoice->save();
        return response()->json([
            'success' => true,
            'invoice' => $invoice,
        ]);
    }
}

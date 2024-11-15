<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(Request $request)
    {

        // $request->validate([
        // ]);

        $ticket = new Ticket();
        
        $ticket->name = $request['name'];
        $ticket->price = $request['price'];
        $ticket->event_id = $request['event_id'];
        $ticket->invoice_id = $request['invoice_id'];

        $ticket->save();
        return response()->json([
            'success' => true,
            'ticket' => $ticket,
        ]);
    }
}

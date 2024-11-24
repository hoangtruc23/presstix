<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Invoice;
use App\Models\Ticket;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'event_id' => 'required|exists:events,id',
            'invoice_id' => 'required|exists:invoices,id',
        ]);

        $ticket = new Ticket();

        $ticket->name = $request['name'];
        $ticket->price = $request['price'];
        $ticket->event_id = $request['event_id'];
        $ticket->invoice_id = $request['invoice_id'];
        $ticket->save();

        $ticket_type = TicketType::where('event_id', $request['event_id'])->first();
        if ($ticket_type) {
            $ticket_type->quantity_sold += $request['quantity'];
            $ticket_type->save();
        }

        return response()->json([
            'success' => true,
            'ticket' => $ticket,
        ]);
    }

    public function getTicketSuccess(Request $request)
    {
        try {
            $user_id = Auth::id();

            $tickets = Ticket::with('event')
                ->orderBy('created_at', 'desc')
                ->whereHas('invoice', function ($query) use ($user_id) {
                    $query->where('user_id', $user_id)
                        ->where('status', 'success');
                })
                ->get();

            foreach ($tickets as $ticket) {
                if ($ticket->event->time_end > time()) {
                    $ticket->status = 'expired';
                    $ticket->save();
                }
            }

            return response()->json([
                'success' => true,
                'tickets' => $tickets,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }
}

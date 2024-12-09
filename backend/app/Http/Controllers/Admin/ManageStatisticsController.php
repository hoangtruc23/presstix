<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class ManageStatisticsController extends Controller
{
    function Ticket_Statistics(Request $request)
    {
        $orderBy = $request->input('orderBy');
        $events = Event::with(['ticket_type', 'images'])->get();

        $ticket_statistics = $events->map(function ($event) {
            $tickets_sold = $event->ticket_type->sum('quantity_sold');
            $total_revenue = $event->ticket_type->map(function ($ticket) {
                return $ticket->price * $ticket->quantity_sold;
            })->sum();
            $images = $event->images->map(function ($image) {
                return [
                    'image_url' => asset($image->image_url),
                    'is_featured' => $image->is_featured,
                ];
            });

            return [
                'event_id' => $event->id,
                'images' => $images,
                'name' => $event->name,
                'tickets_sold' => $tickets_sold,
                'total_revenue' => $total_revenue

            ];
        });

        if ($orderBy == 'ticket') {
            $ticket_statistics = $ticket_statistics->sortByDesc('tickets_sold')->values();
        }
        else if ($orderBy == 'revenue') {
            $ticket_statistics = $ticket_statistics->sortByDesc('total_revenue')->values();
        }

        return response()->json([
            'ticket_statistics' => $ticket_statistics
        ]);
    }
}

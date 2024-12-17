<?php

namespace App\Http\Controllers\Organize;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Models\EventImage;
use App\Models\TicketType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class EventController extends Controller
{

   public function store(Request $request)
    {
        try {
          
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'user_id' => 'required|integer',
                'address' => 'required|string|max:255', 
                'time_start' => 'required|date',
                'time_end' => 'required|date|after:time_start',
                'policy' => 'required|string',
                'ticket_types' => 'required|array',
                'ticket_types.*.name' => 'required|string|max:255',
                'ticket_types.*.price' => 'required|integer',
                'ticket_types.*.quantity' => 'required|integer|min:1',
                'slot' => 'integer',
                'event_cate_id' => 'required|integer|exists:event_categories,id',
                'description' => 'nullable|string', 
                'status' => 'string',
            ]);

            $data['slug'] = Str::slug($data['name']);
            $data['slot'] = array_sum(array_column($data['ticket_types'], 'quantity'));
            $data['description'] = $request->description;

            $event = Event::create($data);

            foreach ($data['ticket_types'] as $ticketType) {
                TicketType::create([
                    'name' => $ticketType['name'],
                    'price' => $ticketType['price'],
                    'quantity' => $ticketType['quantity'],
                    'status' => true,
                    'event_id' => $event->id,
                ]);
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('events', 'public');
                    EventImage::create([
                        'event_id' => $event->id,
                        'image_url' => '/storage/' . $imagePath
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'event' => $event->load('images')
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors occurred',
                'errors' => $e->errors()
            ], 422);
        }
    }

   public function getEventsByUserId($user_id){

        // $user = User::findOrFail($user_id);
        
        $events = Event::with('images')
        ->where('user_id', $user_id)
        ->get();

        return response()->json([
            'events' => EventResource::collection($events),
        ], 200);
   }
 
   
}

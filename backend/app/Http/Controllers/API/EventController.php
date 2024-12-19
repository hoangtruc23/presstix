<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Event;
use App\Models\Image;
use App\Http\Resources\EventResource;
use App\Http\Resources\OrganizerResource;
use App\Models\EventImage;
use App\Models\Location;
use App\Models\Organizer;
use App\Models\TicketType;
use Carbon\Carbon;
use SebastianBergmann\Type\TrueType;

class EventController extends Controller
{
    protected $event;
    public function __construct(Event $event)
    {
        $this->event = $event;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $now = Carbon::now();
        Event::where('status', 'active')
            ->where('time_end', '<', $now)
            ->update(['status' => 'expired']);

        $search = $request->input('search');
        $event_cate = $request->input('event_cate');
        $location = $request->input('location');
        $query = Event::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', '%' . $search . '%');
            });
        }
        if ($event_cate) {
            $query->where('event_cate_id', $event_cate);
        }
        if($location){
            $query->where('location_id', $location);
        }

        $events = $query->with('images')
            ->orderBy('updated_at', 'desc')
            ->get();


        return response()->json([
            'data' => EventResource::collection($events),
            'events' => $events,
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'user_id' => 'required|integer',
                'address' => 'required|string|max:255',
                'location' => 'string|max:255',
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
            var_dump($data);

            $data['slug'] = Str::slug($data['name']);
            $data['slot'] = array_sum(array_column($data['ticket_types'], 'quantity'));

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

            if ($request['location']) {
                $location = Location::where('name', $request['location'])->first();
                if (!$location) {
                    $location =Location::create([
                        'name' => $request['location'],
                        'slug' => Str::slug($request['location'], '-')
                    ]);
                }
                $event->location_id = $location->id;
                $event->save();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('events', 'public');
                    EventImage::create([
                        'event_id' => $event->id,
                        'image_url' => '/storage/' . $imagePath,
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

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $event = Event::where('slug', $slug)->first();

        $organizer = Organizer::where('user_id', $event->user_id)->first();

        if (!$event) {
            abort(404, 'Event not found');
        }

        return response()->json([
            'data' => new EventResource($event),
            'organizer' => new OrganizerResource($organizer)
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatusEvent(Request $request, string $id)
    {
        $event = Event::findOrFail($id);
        try {
            $data = $request->validate([
                'status' => 'nullable|string|',
            ]);
            $event->status = $data['status'];
            $event->save();
            return response()->json([
                'message' => 'Cập nhật thành công',
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors occurred',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        try {
            $data = $request->validate([
                'name' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
                'time_start' => 'nullable|date',
                'time_end' => 'nullable|date|after:time_start',
                'policy' => 'nullable|string',
                'ticket_types' => 'nullable|array',
                'ticket_types.*.name' => 'nullable|string|max:255',
                'ticket_types.*.price' => 'nullable|integer',
                'ticket_types.*.quantity' => 'nullable|integer|min:1',
                'slot' => 'nullable|integer',
                'event_cate_id' => 'nullable|integer|exists:event_categories,id',
                'description' => 'nullable|string',
                'status' => 'nullable|string|',
            ]);

            if ($request->has('name')) {
                $data['slug'] = Str::slug($request->name);
                $event->name = $request->name;
            }

            if ($request->has('status')) {
                $event->status = $request->status;
            }

            if ($request->has('address')) {
                $event->address = $request->address;
            }

            if ($request->has('time_start')) {
                $event->time_start = $request->time_start;
            }

            if ($request->has('time_end')) {
                $event->time_end = $request->time_end;
            }

            if ($request->has('policy')) {
                $event->policy = $request->policy;
            }

            if ($request->has('event_cate_id')) {
                $event->event_cate_id = $request->event_cate_id;
            }

            if ($request->has('description')) {
                $event->description = $request->description;
            }


            if ($request->has('ticket_types')) {
                $ticketTypesData = $request->ticket_types;
                $event->slot = array_sum(array_column($ticketTypesData, 'quantity'));
                foreach ($ticketTypesData as $ticketType) {
                    $eventTicket = TicketType::where('event_id', $event->id)
                        ->where('name', $ticketType['name'])
                        ->first();
                    if ($eventTicket) {
                        $eventTicket->update([
                            'price' => $ticketType['price'],
                            'quantity' => $eventTicket['quantity'] + $ticketType['quantity'],
                        ]);
                    } else {
                        TicketType::create([
                            'name' => $ticketType['name'],
                            'price' => $ticketType['price'],
                            'quantity' => $ticketType['quantity'],
                            'status' => 'available',
                            'event_id' => $event->id,
                        ]);
                    }
                }
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('events', 'public');
                    var_dump($imagePath);
                    die();
                    EventImage::create([
                        'event_id' => $event->id,
                        'image_url' => '/storage/' . $imagePath,
                    ]);
                }
            }

            $event->save();

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công',
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors occurred',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

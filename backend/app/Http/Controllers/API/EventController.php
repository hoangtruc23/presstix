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
use App\Models\EventImage;
use App\Models\TicketType;
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
        $search = $request->input('search');
        $query = Event::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', '%' . $search . '%');
            });
        }

      

        $events = $query->with('images')->paginate(10);

        return response()->json([
            'data' => EventResource::collection($events),
            'meta' => [
                'current_page' => $events->currentPage(),
                'last_page' => $events->lastPage(),
                'per_page' => $events->perPage(),
                'total' => $events->total(),
            ],
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
            $data['description'] = 'kjadhajkshd';


            // Tạo sự kiện mới
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

            // Lưu hình ảnh nếu có
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

        if (!$event) {
            abort(404, 'Event not found');
        }

        return response()->json([
             'data' => new EventResource($event),
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        $status = $request->status;

        $event->status = $status;

        $event->save();

        return response()->json(
            [
                'event' => $event,
                'message' => 'Cập nhật thành công',
            ],
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

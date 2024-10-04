<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Event;
use App\Models\Image;
use App\Http\Resources\EventResource;

class EventController extends Controller
{
    protected $event;
    public function __construct(Event $event){
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
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', '%' . $search . '%');
            });
        }

        $events = $query->paginate(10);

        // $event_all = Event::all();
        // $eventResource = EventResource::collection($event_all);
        // return response()->json([
        //     'data' => $eventResource,
        // ],Response::HTTP_OK);
        
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
        // Lưu sự kiện
        $event = new Event();
        $event->name = $request->input('name');
        $event->save();

        // // Lưu nhiều ảnh
        // if ($request->hasFile('images')) {
        //     foreach ($request->file('images') as $image) {
        //         $imagePath = $image->store('images/events', 'public');
        //         Image::create([
        //             'event_id' => $event->id,
        //             'img_path' => $imagePath
        //         ]);
        //     }
        // }
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

        return response()->json($event,Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

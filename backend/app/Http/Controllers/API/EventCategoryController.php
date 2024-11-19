<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventCategoryResource;
use App\Models\EventCategory;

class EventCategoryController extends Controller
{
    protected $event_cate;
    public function __construct(EventCategory $event_cate){
        $this->event_cate = $event_cate;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event_cate = EventCategory::all();
        $event_cateResource = EventCategoryResource::collection($event_cate);

        return response()->json([
            'data' => $event_cateResource,
        ],Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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

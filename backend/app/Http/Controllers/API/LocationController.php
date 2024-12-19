<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class LocationController extends Controller
{
    public function getLocation()
    {
        $location = Location::all();
        return response()->json([
            'location' => $location,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class ManageEventController extends Controller
{
    function index(){
        $event = Event::all();

        return response()->json([
            'event' => $event
        ]);
    }
}

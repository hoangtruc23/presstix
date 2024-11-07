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

    function destroy($id){
        $event = Event::findOrFail($id);

        if (!$event) {
            return response()->json([
                'message' => 'Không tìm thấy sự kiện'
            ], 404);
        }

        $event->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Xoá sự kiện thành công'
        ]);
    }
}

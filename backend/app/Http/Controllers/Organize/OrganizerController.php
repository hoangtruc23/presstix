<?php


namespace App\Http\Controllers\Organize;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Http\Resources\OrganizerResource;
use App\Models\Event;
use App\Models\Organizer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganizerController extends Controller
{
    public function index()
    {
        $user = Auth::id();
        $organizer = Organizer::where('user_id', $user)->first();
        if ($organizer) {
            return response()->json([
                'organizer' => new OrganizerResource($organizer),
            ], 200);
        } else {
            return response()->json(['message' => 'Bạn chưa cập nhật thông tin ban tổ chức'], 500);
        }
    }

    public function updateWallet()
    {
        $organizers = Organizer::with('user.events.ticket_type')->get();

        foreach ($organizers as $organizer) {
            $totalWallet = 0;
            foreach ($organizer->user->events as $event) {
                foreach ($event->ticket_type as $ticket) {
                    $totalWallet += $ticket->price * $ticket->quantity_sold;
                }
            }
            $organizer->update(['wallet' => $totalWallet]);
        }

        return response()->json([
            'message' => 'Cập nhật ví thành công!'
        ]);
    }

    public function updateInfoBanking(Request $request)
    {
        $user_id = Auth::id();
        $organizer = Organizer::where('user_id', $user_id)->first();

        if ($organizer) {
            $organizer->bank = $request->bank;
            $organizer->account_name = $request->account_name;
            $organizer->account_number = $request->account_number;

            $organizer->save();

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thông tin thành công!'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Không tìm thấy thông tin tổ chức!'
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::id();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|max:2048',
            'user_id' => 'nullable|integer',
        ]);

        $organizer = Organizer::where('user_id', $user)->first();

        if ($organizer) {
            $organizer->name = $request->name;
            $organizer->description = $request->description;
            $organizer->image_url  = $request->image_url;

            if ($request->hasFile('image_url')) {
                $organizer->image_url = $request->file('image_url')->store('images', 'public');
            }

            $organizer->save();


            return response()->json([
                'message' => 'Cập nhật thông tin thành công',
                'data' => $organizer,
            ], 200);
        }

        $organizer = Organizer::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $user,
            'image_url' => $request->hasFile('image_url') ? $request->file('image_url')->store('images', 'public') : null,
        ]);

        return response()->json([
            'message' => 'Tổ chức đã được tạo thành công',
            'data' => $organizer,
        ], 201);
    }
}

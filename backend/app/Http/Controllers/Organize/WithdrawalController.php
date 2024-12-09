<?php

namespace App\Http\Controllers\Organize;

use App\Http\Controllers\Controller;
use App\Models\Organizer;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WithdrawalController extends Controller
{
    public function store()
    {
        $user_id = Auth::id();

        $organizer = Organizer::where('user_id', $user_id)->first();

        $withdrawal = Withdrawal::create([
            'amount' => $organizer->wallet,
            'date_request' => now(),
            'status' => 'pending',
            'user_id' => $user_id,
        ]);

        $organizer->wallet = 0;
        $organizer->save();

        return response()->json([
            'success' => true,
            'message' => 'Yêu cầu thanh toán thành công',
            'data' => $withdrawal,
        ], 201);
    }
}

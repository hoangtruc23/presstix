<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Withdrawal;
use Illuminate\Http\Request;

class ManageWithdrawalController extends Controller
{
    function index()
    {
        $withdrawal = Withdrawal::with('user')->get();

        return response()->json([
            'withdrawal' => $withdrawal
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class ManageUserController extends Controller
{
    public function index()
    {
        // $users = $this->user->paginate(5);
        $users = User::all();
        $usersResource = UserResource::collection($users);

        return response()->json([
            'data' => $usersResource,
        ],Response::HTTP_OK);
    }
}

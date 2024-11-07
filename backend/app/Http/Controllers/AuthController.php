<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $status = Auth::attempt(['email' => $email, 'password' => $password]);
        if ($status) {
            // Create token 
            $token = $request->user()->createToken('auth');

            $user = $request->user();

            return response()->json([
                'success' => true,
                'token' => $token->plainTextToken,
                'user' => ['id'=>$user->id, 'name' => $user->name, 'email' => $user->email, 'phone' => $user->phone],
                'role' => $user->role,
                'message' => "Đăng nhập thành công"
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => "Đăng nhập thất bại"
        ]);
    }


    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'phone' => 'string|max:15',
        ]);

        $user = $request->user();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin thành công',
            'user' => $user,
        ]);
    }
}

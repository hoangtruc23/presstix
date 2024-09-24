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
        if($status){
            // Create token 
            $token = $request->user()->createToken('auth');
            
            $user = $request->user();

            return response()->json([
                'success' => true,
                'token' => $token->plainTextToken,
                'user' => ['name' => $user->name],
                'message' => "Đăng nhập thành công"
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => "Đăng nhập thất bại"
        ]);
    }


    public function profile(Request $request){
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }
}
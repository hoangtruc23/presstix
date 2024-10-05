<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();
        // if ($user != null && $user->role == ('admin' || 'customer')) {
        //     return $next($request);
        // }
      
        switch ($role) {
            case 'admin':
                if ($user && $user->role == 0) {
                    return $next($request);
                }
                break;
            case 'user':
                if ($user && $user->role == 2) {
                    return $next($request);
                }

            default:
                return response()->json([
                    'message' => 'Hãy đăng nhập để truy cập',
                ], 401);
                break;
        }

        return response()->json([
            'message' => 'Hãy đăng nhập để truy cập',
            'user' => $user,

        ], 401);
    }
}

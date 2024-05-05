<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request, LoginRequest $credentials) {
        try
        {
            if (Auth::attempt($credentials->safe(["username", "password"])))
            {
                $token = $request->user()->createToken('user_token');
                return response([
                    "status" => "success",
                    "user" => Auth::user(),
                    "token" => $token->plainTextToken
                ]);
            }
        }
        catch (ValidationException $error)
        {
            return response(["status" => "failure", "messages" => $error]);
        }
    }
    public function user () {
        try
        {
            return response([
                "status" => "success",
                "user" => Auth::user()
            ]);
        }
        catch (Exception $error)
        {
            return response([
                "status" => "failure",
                "messages" => $error->getMessage()
            ]);
        }
    }
    public function register(RegisterRequest $request) {
        $user = User::Create($request->validated());
        return response([
            "status" => "success",
            "user" => $user
        ]);
    }
    public function logout(Request $request) {
        return response(["success" => "maybe"]);
        // Auth::logout();
        // $request->session()->invalidate();
        // $request->session()->regenerate();
    }
}

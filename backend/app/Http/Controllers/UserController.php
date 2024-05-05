<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index()
    {
        return new UserCollection(User::all());
    }

    public function store(StoreUserRequest $request)
    {
        try
        {
            $user = User::create();
            return response([
                "status" => "success",
                "user" => $user
            ]);
        }
        catch (Exception $error)
        {
            return response([
                "status" => "failure",
                "message" => $error->getMessage()
            ], 422);
        }
    }
}

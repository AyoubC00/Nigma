<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttemptCollection;
use App\Models\Attempt;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttemptController extends Controller
{
    public function index () {
        $attempts = Attempt::tokenBy(Auth::user()->id)->get();
        return [
            "status" => "success",
            "data" => AttemptCollection::make($attempts)
        ];
    }
    public function store (Request $request) {
        try
        {
            $user = Auth::user();
            $user->attempts()->create(["quiz_id" => $request->id, "is_complete" => false, "score" => 0]);
            return response([
                "status" => "success",
                "message" => "Attempet saved"
            ]);
        }
        catch (Exception $error)
        {
            return response([
                "status" => "failure",
                "message" => "Attempet couldn't be saved" . $error
            ]);
        }
    }

    public function reset(Request $request) {
        try
        {
            $user = Auth::user();
            $user->attempts->where("quiz_id", $request->quiz_id)->first()->update(["score" => 0]);
            return response([
                "status" => "success",
                "message" => "Score reseted"
            ]);
        }
        catch (Exception $error)
        {
            return response([
                "status" => "failure",
                "message" => "Couldn't reset score"
            ]); 
        }
        
    }
}

<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users', function (Request $request) {
    try
    {
        return $request->user();
    }
    catch (Exception $err)
    {
        return response(["status" => "failure"]);
    }
})->middleware('auth:sanctum');

Route::post("login", [AuthController::class, "login"]);
Route::get("user", [AuthController::class, "user"]);
Route::post("register", [AuthController::class, "register"]);
Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');

Route::post("/contact", [MailController::class, "contact"]);

Route::apiResource("quiz", QuizController::class)->except("index")->middleware('auth:sanctum');
Route::get("answer/{option}", [AnswerController::class, "check"])->middleware('auth:sanctum');
Route::get("quiz", [QuizController::class, "index"]);
Route::apiResource("question", QuizController::class);
Route::apiResource("option", QuizController::class);
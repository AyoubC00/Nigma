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

Route::get("quiz/popular", [QuizController::class, "list"]);
Route::apiResource("question", QuizController::class);
Route::apiResource("option", QuizController::class);
Route::get("quiz/proprietary", [QuizController::class, "proprietary"])->middleware('auth:sanctum');
Route::apiResource("quiz", QuizController::class)->except("list")->middleware('auth:sanctum');
Route::post("answer/{question}", [AnswerController::class, "check"])->middleware('auth:sanctum');
Route::post("attempt/{id}", [AttemptController::class, "store"])->middleware('auth:sanctum');
Route::get("attempt", [AttemptController::class, "index"])->middleware('auth:sanctum');
Route::post("attempt/{quiz_id}/reset", [AttemptController::class, "reset"])->middleware('auth:sanctum');
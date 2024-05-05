<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::post("login", [AuthController::class, "login"]);
// Route::get("user", [AuthController::class, "user"]);
// Route::post("register", [AuthController::class, "register"]);
// Route::post("logout", [AuthController::class, "logout"])->middleware('auth');

// Route::post("/contact", [MailController::class, "contact"]);
// Route::apiResource("api/quiz", QuizController::class);
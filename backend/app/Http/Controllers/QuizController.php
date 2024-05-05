<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizRequest;
use App\Http\Resources\QuizCollection;
use App\Http\Resources\QuizResource;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new QuizCollection(Quiz::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        $user = Auth::user();
        $title = $request->validated(["title"]);
        $image = $request->validated("image");
        $questions = $request->validated(["questions"]);
        $image_url = Storage::disk("public")->putFile("images", $image, "public");
        $image_url = Storage::disk("public")->url($image_url);
        DB::beginTransaction();
            $quiz = $user->quizzes()->create(["title" => $title, "image" => $image_url]);
            forEach($questions as $question) {
                $question_instance = $quiz->questions()->create(["text" => $question["text"]]);
                $options = $question_instance->options()->createMany($question["options"]);
            }
        DB::commit();
        // return response(["quiz" => $questions]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        return response([
            "status" => "success",
            "data" => new QuizResource($quiz)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        //
    }
}

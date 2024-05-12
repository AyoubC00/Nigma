<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizRequest;
use App\Http\Resources\QuizCollection;
use App\Http\Resources\QuizResource;
use App\Models\Attempt;
use App\Models\Quiz;
use Exception;
use Illuminate\Database\Eloquent\Builder;
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
        try
        {
            return [
                "status" => "success",
                "data" => QuizCollection::make(Quiz::all())
            ];
        }
        catch (Exception $error)
        {
            return [
                "status" => "failure",
                "message" => $error->getMessage()
            ];
        }
    }

    public function list()
    {
        $quizzes = Quiz::with('attempt')->get();
        try
        {
            return [
                "status" => "success",
                "data" => QuizCollection::make($quizzes)
            ];
        }
        catch (Exception $error)
        {
            return [
                "status" => "failure",
                "message" => $error->getMessage()
            ];
        }
    }

    public function proprietary ()
    {
        try
        {
            $quizzes = Quiz::createdBy(Auth::user()->id)->get();
            return [
                "status" => "success",
                "data" => QuizCollection::make($quizzes)
            ];
        }
        catch (Exception $error)
        {
            return [
                "status" => "failure",
                "message" => $error->getMessage()
            ];
        }
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
            $quiz = $user->quizzes()->create(["title" => $title, "image" => $image_url, "mode" => "Solo"]);
            forEach($questions as $question) {
                $question_instance = $quiz->questions()->create(["text" => $question["text"]]);
                $options = $question_instance->options()->createMany($question["options"]);
            }
        DB::commit();
        return response([
            "status" => "success",
            "message" => "The quiz was created successfully."
        ]);
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

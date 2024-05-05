<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function check(Request $request) {
        $question = Question::find($request->question_id);
        $options = $question->options->where("is_correct", true)->toArray();
        $options_id = array_map(fn ($option) => $option["id"] , $options);
        return response([
            "status" => "success",
            "data" => $options_id
        ]);
    }
}

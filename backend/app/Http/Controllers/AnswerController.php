<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    public function check(Request $request, Question $question) {
        $options_array = $question->options->toArray();
        $attempt = Auth::user()->attempts->where("quiz_id", $question->quiz_id)->first();
        $score = $attempt->score;

        if ($attempt->answers->where("question_id", $question->id)->first() !== null)
        {
            $attempt->answers()->where("question_id", $question->id)->update(["option_id" => $request->option_id]);
        }
        else
        {
            $attempt->answers()->create(["question_id" => $question->id, "option_id" => $request->option_id]);
        }

        $options = array_reduce(
            $options_array, 
            fn ($carry, $option) => $carry + [$option['id'] => (boolean) $option['is_correct']]
        , []);
        
        $correct_answers = array_filter($options_array, fn ($option) => $option['is_correct'] == true && $option['id'] == $request->option_id);
        $attempt->update(["score" => $score + count($correct_answers)]);
        return response([
            "status" => "success",
            "data" => $options
        ]);
    }
}

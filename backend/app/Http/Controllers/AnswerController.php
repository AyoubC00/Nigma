<?php

namespace App\Http\Controllers;

use App\Models\Option;

class AnswerController extends Controller
{
    public function check(Option $option) {
        return response([
            "status" => "success",
            "data" => [
                "is_correct" => (boolean) $option->is_correct
            ]
        ]);
    }
}

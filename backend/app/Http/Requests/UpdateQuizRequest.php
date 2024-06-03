<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuizRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "nullable",
            "questions" => "nullable|array",
            "questions.*.id" => "required|exists:questions,id",
            "questions.*.text" => "nullable",
            "questions.*.options" => "nullable|array",
            "questions.*.options.*.id" => "required",
            "questions.*.options.*.text" => "nullable",
            "questions.*.options.*.is_correct" => "nullable",
            "image" => "nullable|image|mimes:jpg,jpeg,png"
        ];
    }
}

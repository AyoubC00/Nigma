<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "required",
            "questions" => "required|array",
            "questions.*.text" => "required",
            "questions.*.options" => "required|array",
            "questions.*.options.*.text" => "required",
            "questions.*.options.*.is_correct" => "required",
            "image" => "required|image|mimes:jpg,jpeg,png"
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class QuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            // "category" => $this->category,
            "image" => $this->image,
            "taken" => (boolean) Auth::user()?->attempts->where("quiz_id", $this->id)->first(),
            "questions" => new QuestionCollection($this->questions),
        ];
    }
}

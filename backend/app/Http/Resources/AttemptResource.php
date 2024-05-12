<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttemptResource extends JsonResource
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
            "quiz_id" => $this->quiz->id,
            "title" => $this->quiz->title,
            "score" => $this->score * 100,
            "mode" => $this->quiz->mode,
            "since" => $this->updated_at->diffForHumans()
        ];
    }
}

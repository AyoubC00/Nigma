<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        "text",
        "is_correct",
        "question_id"
    ];

    public function question () : BelongsTo {
        return $this->belongsTo(Question::class);
    }

    public function attempt () : BelongsTo {
        return $this->belongsTo(Attempt::class);
    }
}

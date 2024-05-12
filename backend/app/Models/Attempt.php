<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attempt extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "quiz_id",
        "is_complete",
        "score"
    ];
    public function quiz () : BelongsTo {
        return $this->belongsTo(Quiz::class);
    }

    public function scopeTokenBy(Builder $query, $user_id): void {
        $query->where("user_id", $user_id);
    }

    public function user () : BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function answers () : HasMany {
        return $this->hasMany(Answer::class);
    }
}

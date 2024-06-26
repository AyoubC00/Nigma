<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "user_id",
        "image",
        "mode"
    ];

    public function scopeCreatedBy(Builder $query, $user_id) : void {
        $query->where("user_id", $user_id);
    }

    public function questions () : HasMany {
        return $this->hasMany(Question::class);
    }

    public function user () : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function attempt () : HasOne {
        return $this->hasOne(Attempt::class);
    }
}

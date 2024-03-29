<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShiftType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'active_duty',
        'min_occupation',
        'opt_occupation'
    ];

    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
}

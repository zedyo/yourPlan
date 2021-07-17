<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Date;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'qualification_id'
    ];

    public function qualification(){
        return $this->belongsTo(Qualification::class, 'qualification_id');
    }

    public function getDiffForHumansAttribute() {
        $now = Date::now();
        return $this->created_at->diffForHumans($now);
    }
}

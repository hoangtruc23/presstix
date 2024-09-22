<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'slug',
        'location',
        'slot',
        'time_start',
        'time_end',
        'policy',
        'status',
    ];
}

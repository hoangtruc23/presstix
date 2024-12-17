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
        'user_id',
        'slug',
        'address',
        'locations',
        'slot',
        'time_start',
        'time_end',
        'description',
        'policy',
        'status',
        'event_cate_id', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(EventImage::class);
    }

    public function ticket_type()
    {
        return $this->hasMany(TicketType::class);
    }
}

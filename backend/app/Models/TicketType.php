<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'price',
        'quantity',
        'status',
        'event_id', 
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

   

}

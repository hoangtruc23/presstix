<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'price',
        'image',

    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function event()
{
    return $this->belongsTo(Event::class);
}
}

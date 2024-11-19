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

    public function invoice() {
        return $this->hasOne(Invoice::class);
    }
    
    public function events()
{
    return $this->belongsToMany(Event::class);
}
}

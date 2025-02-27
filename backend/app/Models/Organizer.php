<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'wallet',
        'name',
        'description',
        'bank',
        'account_name',
        'account_number',
        'image_url',
        'user_id',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

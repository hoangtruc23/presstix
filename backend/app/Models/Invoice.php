<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'invoice_date',
        'amount',
        'status',
        'transaction_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

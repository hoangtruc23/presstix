<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'transaction_id',
        'invoice_id',
        'amount',
        'description',
        'date',
        
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}

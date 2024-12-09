<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_url' =>  asset('storage/'.$this->image_url),
            'wallet' => $this->wallet,
            'bank' => $this->bank,
            'account_name' => $this->account_name,
            'account_number' => $this->account_number,
          
        ];    
    }
}

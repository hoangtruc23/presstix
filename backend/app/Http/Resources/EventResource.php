<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'user_id' => $this->user_id,
            'address' => $this->address,
            'time_start' => $this->time_start,
            'time_end' => $this->time_end,
            'description' => $this->description,
            'policy' => $this->policy,
            'status' => $this->status,
            'event_cate_id' => $this->event_cate_id,
           
            'images' => $this->images->map(function ($image) {
                return [
                    // 'image_url' => asset('storage/' . $image->image_url),
                    'image_url' => asset($image->image_url),
                    'is_featured' => $image->is_featured,
                ];
            }),

            'ticket_type' => $this->ticket_type,
        ];
    }
}

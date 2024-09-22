<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->sentence;

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'location' => $this->faker->sentence,
            'slot' => $this->faker->numberBetween(1, 100),
            'time_start' => $this->faker->date(),
            'time_end' => $this->faker->date(),
            'policy' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['active', 'expired']),
            'image_path' => $this->faker->sentence,
            'event_cate_id' => $this->faker->randomElement(\App\Models\EventCategory::pluck('id')->toArray()),
        ];
    }
}

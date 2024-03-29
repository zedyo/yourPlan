<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'qualification_id' => 1,
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->unique()->lastName(),
            'daily_worktime' => 8.00,
            'employment_ratio' => 100
        ];
    }
}

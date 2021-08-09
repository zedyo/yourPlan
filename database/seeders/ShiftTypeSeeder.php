<?php

namespace Database\Seeders;

use App\Models\ShiftType;
use Illuminate\Database\Seeder;

class ShiftTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dummyShiftType1 = new ShiftType([
            'name' => 'Frühschicht'
        ]);
        $dummyShiftType1->save();

        $dummyShiftType2 = new ShiftType([
            'name' => 'Spätschicht'
        ]);
        $dummyShiftType2->save();

        $dummyShiftType3 = new ShiftType([
            'name' => 'Nachtschicht'
        ]);
        $dummyShiftType3->save();
    }
}

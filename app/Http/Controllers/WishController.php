<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use App\Models\Wish;
use Illuminate\Http\Request;

class WishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wish  $wish
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Wish $wish)
    {
        $wish_check = Wish::where('employee_id', $request->employee_id);
        $wish_check->where('day', $request->day);
        $wish_check->where('month', $request->month);
        $wish_check->where('year', $request->year);
        $wish = $wish_check->get();

        if ($wish->isEmpty()) {
            $new_wish = new Wish();
            $new_wish->employee_id = $request->employee_id;
            $new_wish->shift_id = $request->shift_id;
            $new_wish->day = $request->day;
            $new_wish->month = $request->month;
            $new_wish->year = $request->year;

            $new_wish->save();

            $wish = Wish::with('shift')->where('id', $new_wish->id)->first();

            return ['new_wish' => $wish];
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wish  $wish
     * @return \Illuminate\Http\Response
     */
    public function show(Wish $wish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Wish  $wish
     * @return \Illuminate\Http\Response
     */
    public function edit(Wish $wish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wish  $wish
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wish $wish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wish  $wish
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wish $wish)
    {
        //
    }
}

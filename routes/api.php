<?php

use App\Http\Controllers\DutyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\QualificationController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\ShiftTypeController;
use App\Http\Controllers\WishController;
use App\Http\Controllers\WorkingHoursDiffController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::patch('/duty', [DutyController::class, 'update']);
Route::post('/duty', [DutyController::class, 'delete']);

Route::get('/duties/{year}/{month}/', [DutyController::class, 'getAllDutiesData'])->name('getAllDutiesData');
Route::get('/duties/{year}/{month}/{employee_id}', [DutyController::class, 'getDutiesData'])->name('getDutiesData');
Route::get('/duties', [DutyController::class, 'overview'])->name('overview');

Route::resources([
    'qualifications' => QualificationController::class,
    'employees' => EmployeeController::class,
    'shifts' => ShiftController::class,
    'shift_types' => ShiftTypeController::class,
    'wishes' => WishController::class,
    'preferences' => PreferenceController::class,
    'working_hours_diffs' => WorkingHoursDiffController::class
]);

// Route::get('/shift_types/{shift_type_id}/{day}/{month}/{year}/', [DutyController::class, 'showDutiesByShiftTypeAndDate'])->name('showShiftType');
Route::post('/wish', [WishController::class, 'create']);
Route::get('/wishesByEmployee/{employee_id}', [WishController::class, 'getEmployeeWishData']);
Route::post('/preference', [PreferenceController::class, 'create']);
Route::patch('/preference', [PreferenceController::class, 'delete']);
// Route::get('/preferencesByEmployee/{employee_id}', [WishController::class, 'getEmployeePreferenceData']);

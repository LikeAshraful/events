<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', function () {
    return redirect()->route('events.city', ['city' => 'new-york']); // Default redirect or home page
});


Route::get('/events/{city}', [App\Http\Controllers\EventController::class, 'index'])->name('events.city');
Route::get('/event/{event}/go', [App\Http\Controllers\EventController::class, 'redirect'])->name('events.redirect');


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_events' => \App\Models\Event::count(),
            'published_events' => \App\Models\Event::where('status', 'published')->count(),
            'total_clicks' => (int) \App\Models\Event::sum('clicks'),
        ];
        
        $upcoming_events = \App\Models\Event::where('start_datetime', '>=', now())
            ->orderBy('start_datetime', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'upcoming_events' => $upcoming_events,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Note: Assuming auth middleware would wrap this group in a real application
    // Route::middleware('auth')->group(function () {
        Route::resource('events', App\Http\Controllers\Admin\EventController::class)->except(['show']);
    // });
});
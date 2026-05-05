<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [App\Http\Controllers\EventController::class, 'index'])->name('home');
Route::get('/events', [App\Http\Controllers\EventController::class, 'index'])->name('events.index');
Route::get('/events/{city}', [App\Http\Controllers\EventController::class, 'index'])->name('events.city');
Route::get('/event/{event:slug}', [App\Http\Controllers\EventController::class, 'show'])->name('events.show');
Route::get('/event/{event}/go', [App\Http\Controllers\EventController::class, 'redirect'])->name('events.redirect');

// Static Pages
Route::get('/about', [App\Http\Controllers\PageController::class, 'about'])->name('about');
Route::get('/contact', [App\Http\Controllers\PageController::class, 'contact'])->name('contact');
Route::get('/help', [App\Http\Controllers\PageController::class, 'help'])->name('help');
Route::get('/privacy', [App\Http\Controllers\PageController::class, 'privacy'])->name('privacy');
Route::get('/terms', [App\Http\Controllers\PageController::class, 'terms'])->name('terms');
Route::get('/faq', [App\Http\Controllers\PageController::class, 'faq'])->name('faq');
Route::get('/create-event', [App\Http\Controllers\PageController::class, 'createEvent'])->name('create-event');


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
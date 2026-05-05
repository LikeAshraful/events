<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\FetchEventsJob;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new FetchEventsJob)->hourly();

Artisan::command('events:fetch', function () {
    $this->info('Starting event scrapers...');
    // Dispatch synchronously so we can see when it finishes in the console
    dispatch_sync(new FetchEventsJob());
    $this->info('Event scraping completed successfully!');
})->purpose('Fetch events using all registered scrapers immediately');

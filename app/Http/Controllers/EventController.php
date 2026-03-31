<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    protected EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Display a listing of events by city.
     * Route: /events/{city}
     */
    public function index(?string $city = null): Response
    {
        $parsedCity = $city ? strtolower($city) : null;
        $events = $this->eventService->getEvents($parsedCity);
        $availableCities = $this->eventService->getAvailableCities();

        return Inertia::render('Events/Index', [
            'city' => $city ? ucfirst($parsedCity) : null,
            'events' => $events,
            'availableCities' => $availableCities,
        ]);
    }

    /**
     * Handle the event redirect to track clicks.
     * Route: /event/{id}/go
     */
    public function redirect(Event $event)
    {
        // 404 if event isn't published
        if ($event->status !== 'published') {
            abort(404);
        }

        $url = $this->eventService->recordClickAndGetRedirectUrl($event);

        return redirect()->away($url);
    }
}

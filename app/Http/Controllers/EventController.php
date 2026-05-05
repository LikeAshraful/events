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
    public function index(Request $request, ?string $city = null): Response
    {
        $parsedCity = $city ? strtolower($city) : null;
        $search = $request->input('search');

        $events = $this->eventService->getEvents($parsedCity, $search);
        $availableCities = $this->eventService->getAvailableCities();

        // Get featured events for home page
        $featuredEvents = null;
        if (!$city) {
            $featuredEvents = Event::where('status', 'published')
                ->where('featured', true)
                ->where('start_datetime', '>=', now())
                ->orderBy('start_datetime', 'asc')
                ->take(6)
                ->get();
        }

        return Inertia::render('Events/Index', [
            'city' => $city ? ucfirst($parsedCity) : null,
            'events' => $events,
            'availableCities' => $availableCities,
            'search' => $search,
            'featuredEvents' => $featuredEvents,
        ]);
    }

    /**
     * Display the specified event.
     * Route: /event/{slug}
     */
    public function show(Event $event): Response
    {
        if ($event->status !== 'published') {
            abort(404);
        }

        return Inertia::render('Events/Show', [
            'event' => $event,
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

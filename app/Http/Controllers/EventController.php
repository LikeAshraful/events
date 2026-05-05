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

        // Get featured and past events for home page
        $featuredEvents = null;
        $pastEvents = null;
        if (!$city) {
            $featuredEvents = Event::published()
                ->featured()
                ->upcoming()
                ->take(6)
                ->get();
            
            $pastEvents = Event::published()
                ->past()
                ->take(6)
                ->get();
        }

        return Inertia::render('Events/Index', [
            'city' => $city ? ucfirst($parsedCity) : null,
            'events' => $events,
            'availableCities' => $availableCities,
            'search' => $search,
            'featuredEvents' => $featuredEvents,
            'pastEvents' => $pastEvents,
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

        $pastEvents = Event::published()
            ->past()
            ->take(5)
            ->get();

        return Inertia::render('Events/Show', [
            'event' => $event,
            'pastEvents' => $pastEvents,
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

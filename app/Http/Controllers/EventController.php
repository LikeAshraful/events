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
    public function index(string $city): Response
    {
        $events = $this->eventService->getEventsByCity(strtolower($city));

        return Inertia::render('Events/Index', [
            'city' => ucfirst(strtolower($city)),
            'events' => $events,
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

<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class EventService
{
    /**
     * Get published and upcoming events for a specific city.
     * Caches the results for 10 minutes to improve performance.
     */
    public function getEventsByCity(string $city)
    {
        $cacheKey = "events_city_{$city}";

        return Cache::remember($cacheKey, 600, function () use ($city) {
            return Event::published()
                ->upcoming()
                ->where('city', $city)
                ->get();
        });
    }

    /**
     * Track a click and get the external URL for redirection.
     */
    public function recordClickAndGetRedirectUrl(Event $event): string
    {
        $event->increment('clicks');
        return $event->external_url;
    }

    /**
     * Create a new event.
     */
    public function createEvent(array $data): Event
    {
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $event = Event::create($data);
        $this->clearCityCache($event->city);

        return $event;
    }

    /**
     * Update an existing event.
     */
    public function updateEvent(Event $event, array $data): Event
    {
        $oldCity = $event->city;
        
        if (isset($data['title']) && $data['title'] !== $event->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $event->id);
        }

        $event->update($data);

        // Clear cache for both old and new city if it changed
        $this->clearCityCache($oldCity);
        if ($oldCity !== $event->city) {
            $this->clearCityCache($event->city);
        }

        return $event;
    }

    /**
     * Delete an event.
     */
    public function deleteEvent(Event $event): void
    {
        $city = $event->city;
        $event->delete();
        $this->clearCityCache($city);
    }

    /**
     * Generate a unique slug based on title.
     */
    protected function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while ($this->slugExists($slug, $ignoreId)) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    /**
     * Check if a slug already exists in the database.
     */
    protected function slugExists(string $slug, ?int $ignoreId = null): bool
    {
        $query = Event::where('slug', $slug);
        
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    /**
     * Clear the cache for a specific city's event list.
     */
    public function clearCityCache(string $city): void
    {
        Cache::forget("events_city_{$city}");
    }
}

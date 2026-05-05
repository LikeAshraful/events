<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Facades\Log;
use Throwable;

class EventAggregatorService
{
    /** @var \App\Scrapers\ScraperInterface[] */
    protected array $scrapers;

    public function __construct()
    {
        // Register your scrapers here
        $this->scrapers = [
            // new \App\Scrapers\ExampleScraper(),
            // new \App\Scrapers\EventBriteScraper(),
            new \App\Scrapers\TickifyScraper(),
        ];
    }

    /**
     * Run all registered scrapers and store the events.
     */
    public function aggregate(): void
    {
        foreach ($this->scrapers as $scraper) {
            Log::info("Starting scraper: " . get_class($scraper));

            try {
                $eventsData = $scraper->scrape();
                $count = 0;

                foreach ($eventsData as $data) {
                    if (empty($data['external_url'])) {
                        continue;
                    }

                    // updateOrCreate to prevent duplicates based on external_url
                    Event::updateOrCreate(
                        ['external_url' => $data['external_url']],
                        $data
                    );
                    $count++;
                }

                Log::info("Completed scraper: " . get_class($scraper) . ". Processed {$count} events.");

            } catch (Throwable $e) {
                Log::error("Error running scraper " . get_class($scraper) . ": " . $e->getMessage());
            }
        }
    }
}

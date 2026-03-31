<?php

namespace App\Scrapers;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Log;
use Throwable;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ExampleScraper implements ScraperInterface
{
    protected string $sourceName = 'example';
    protected string $baseUrl = 'https://example-events-listing.com';

    public function scrape(): array
    {
        $events = [];
        $client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 30.0,
            'verify'   => false, // Adjust based on environment
        ]);

        try {
            // For example purposes, we request a hypothetical events page
            // Since this is a generic implementation, this URL might not exist.
            // Replace with actual endpoint e.g., /events
            $response = $client->get('/events');
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);

            // Filter event item nodes (Change selector to match actual HTML structure)
            $crawler->filter('.event-list-item')->each(function (Crawler $node, $i) use (&$events) {
                try {
                    // Title
                    $title = $node->filter('.event-title')->count() > 0 
                        ? trim($node->filter('.event-title')->text()) 
                        : null;

                    // URL
                    $url = $node->filter('a.event-link')->count() > 0 
                        ? $node->filter('a.event-link')->attr('href') 
                        : null;

                    // Ensure absolute URL
                    if ($url && !Str::startsWith($url, 'http')) {
                        $url = rtrim($this->baseUrl, '/') . '/' . ltrim($url, '/');
                    }

                    // Date
                    $dateText = $node->filter('.event-date')->count() > 0 
                        ? trim($node->filter('.event-date')->text()) 
                        : null;
                    
                    $startDatetime = null;
                    if ($dateText) {
                        try {
                            $startDatetime = Carbon::parse($dateText)->toDateTimeString();
                        } catch (Throwable $t) {
                            Log::warning("Could not parse date text: {$dateText} from source {$this->sourceName}");
                        }
                    }

                    // Venue
                    $venue = $node->filter('.event-venue')->count() > 0 
                        ? trim($node->filter('.event-venue')->text()) 
                        : null;

                    if ($title && $url && filter_var($url, FILTER_VALIDATE_URL)) {
                        $events[] = [
                            'title' => $title,
                            'slug' => Str::slug($title) . '-' . uniqid(),
                            'start_datetime' => $startDatetime ?? now()->toDateTimeString(),
                            'venue' => $venue,
                            'external_url' => $url,
                            'source' => $this->sourceName,
                            'status' => 'published',
                            'clicks' => 0,
                        ];
                    }

                } catch (Throwable $e) {
                    Log::error("Error parsing an event structure from {$this->sourceName}: " . $e->getMessage());
                }
            });

        } catch (Throwable $e) {
            Log::error("Failed to scrape {$this->sourceName}: " . $e->getMessage());
        }

        return $events;
    }
}

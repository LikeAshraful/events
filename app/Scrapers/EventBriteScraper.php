<?php

namespace App\Scrapers;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Log;
use Throwable;
use Carbon\Carbon;
use Illuminate\Support\Str;

class EventBriteScraper implements ScraperInterface
{
    protected string $sourceName = 'EventBrite';
    protected string $baseUrl = 'https://www.eventbrite.com';

    public function scrape(): array
    {
        $events = [];
        $client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 30.0,
            'verify'   => false, // Adjust based on environment
        ]);

        try {
            // Request the actual events listing for Dhaka, Bangladesh
            $response = $client->get('/d/bangladesh--dhaka/events/');
            $html = $response->getBody()->getContents();
            $crawler = new Crawler($html);

        // Container for each event card
        $crawler->filter('discover-vertical-event-card')->each(function (Crawler $node) use (&$events) {
            try {
                // Title – usually inside .eds-event-card-content__title
                $title = $node->filter('.eds-event-card-content__title')->count()
                    ? trim($node->filter('.eds-event-card-content__title')->text())
                    : null;

                // URL – anchor with .eds-event-card-content__action-link (or fallback to first <a>)
                $url = $node->filter('a.eds-event-card-content__action-link')->count()
                    ? $node->filter('a.eds-event-card-content__action-link')->attr('href')
                    : $node->filter('a')->attr('href');
                if ($url && !Str::startsWith($url, 'http')) {
                    $url = rtrim($this->baseUrl, '/') . '/' . ltrim($url, '/');
                }

                // Date – often inside .eds-event-card-content__sub-title or .eds-text-bs--fixed
                $dateText = $node->filter('.eds-event-card-content__sub-title')->count()
                    ? trim($node->filter('.eds-event-card-content__sub-title')->text())
                    : ($node->filter('.eds-text-bs--fixed')->count()
                        ? trim($node->filter('.eds-text-bs--fixed')->text())
                        : null);
                $startDatetime = null;
                if ($dateText) {
                    try {
                        $startDatetime = Carbon::parse($dateText)->toDateTimeString();
                    } catch (Throwable $t) {
                        Log::warning("Could not parse date '{$dateText}' for EventBrite");
                    }
                }

                // Venue – may be inside .card-text--truncated__one or .eds-event-card-content__sub-title (after date extraction)
                $venue = $node->filter('.card-text--truncated__one')->count()
                    ? trim($node->filter('.card-text--truncated__one')->text())
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
                Log::error('Error parsing EventBrite event node: ' . $e->getMessage());
            }
        });

        // Log the number of events we actually extracted for debugging
        Log::info('EventBriteScraper extracted ' . count($events) . ' events');

                // try {
                //     // Title
                //     $title = $node->filter('.event-title')->count() > 0 
                //         ? trim($node->filter('.event-title')->text()) 
                //         : null;

                //     // URL
                //     $url = $node->filter('a.event-link')->count() > 0 
                //         ? $node->filter('a.event-link')->attr('href') 
                //         : null;

                //     // Ensure absolute URL
                //     if ($url && !Str::startsWith($url, 'http')) {
                //         $url = rtrim($this->baseUrl, '/') . '/' . ltrim($url, '/');
                //     }

                //     // Date
                //     $dateText = $node->filter('.event-date')->count() > 0 
                //         ? trim($node->filter('.event-date')->text()) 
                //         : null;
                    
                //     $startDatetime = null;
                //     if ($dateText) {
                //         try {
                //             $startDatetime = Carbon::parse($dateText)->toDateTimeString();
                //         } catch (Throwable $t) {
                //             Log::warning("Could not parse date text: {$dateText} from source {$this->sourceName}");
                //         }
                //     }

                //     // Venue
                //     $venue = $node->filter('.event-venue')->count() > 0 
                //         ? trim($node->filter('.event-venue')->text()) 
                //         : null;

                //     if ($title && $url && filter_var($url, FILTER_VALIDATE_URL)) {
                //         $events[] = [
                //             'title' => $title,
                //             'slug' => Str::slug($title) . '-' . uniqid(),
                //             'start_datetime' => $startDatetime ?? now()->toDateTimeString(),
                //             'venue' => $venue,
                //             'external_url' => $url,
                //             'source' => $this->sourceName,
                //             'status' => 'published',
                //             'clicks' => 0,
                //         ];
                //     }

                // } catch (Throwable $e) {
                //     Log::error("Error parsing an event structure from {$this->sourceName}: " . $e->getMessage());
                // }
            // });

        } catch (Throwable $e) {
            Log::error("Failed to scrape {$this->sourceName}: " . $e->getMessage());
        }

        return $events;
    }
}

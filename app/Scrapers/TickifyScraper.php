<?php

namespace App\Scrapers;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Log;
use Throwable;
use Carbon\Carbon;
use Illuminate\Support\Str;

class TickifyScraper implements ScraperInterface
{
    protected string $sourceName = 'Tickify';
    protected string $baseUrl = 'https://tickify.live/';

    public function scrape(): array
    {
        $events = [];
        $client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 30.0,
            'verify'   => false, 
        ]);

        try {
            // Request the actual events listing for Dhaka, Bangladesh
            $response = $client->get('events/');
            $html = $response->getBody()->getContents();


            $crawler = new Crawler($html);
            Log::info($crawler->html());
            
        // Container for each event card
        $crawler->filter('.isotope-item')->each(function (Crawler $node) use (&$events) {
            try {
                // Title – usually inside .eds-event-card-content__title
                $title = $node->filter('.item_title')->count()
                    ? trim($node->filter('.item_title h3')->text())
                    : null;

                // URL – anchor with .eds-event-card-content__action-link (or fallback to first <a>)
                $url = $node->filter('a.strip_info')->count()
                    ? $node->filter('a.strip_info')->attr('href')
                    : $node->filter('a')->attr('href');
                if ($url && !Str::startsWith($url, 'http')) {
                    $url = rtrim($this->baseUrl, '/') . '/' . ltrim($url, '/');
                }

                // Date – often inside .eds-event-card-content__sub-title or .eds-text-bs--fixed
                $dateText = $node->filter('.fw-normal')->count()
                    ? trim($node->filter('.fw-normal')->text())
                    : null;
                $startDatetime = null;
                if ($dateText) {
                    try {
                        $startDatetime = Carbon::parse($dateText)->toDateTimeString();
                    } catch (Throwable $t) {
                        Log::warning("Could not parse date '{$dateText}' for EventBrite");
                    }
                }

                // Venue – may be inside .card-text--truncated__one or .eds-event-card-content__sub-title (after date extraction)
                $venue = $node->filter('.event-location')->count()
                    ? trim($node->filter('.event-location')->text())
                    : null;

                $banner = $node->filter('.strip img')->count()
                    ? $node->filter('.strip img')->attr('src')
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
                        'city' => 'Dhaka',
                        'banner' => $banner,
                        'clicks' => 0,
                    ];
                }
            } catch (Throwable $e) {
                Log::error('Error parsing EventBrite event node: ' . $e->getMessage());
            }
        });

        // Log the number of events we actually extracted for debugging
        Log::info('TickifyScraper extracted ' . count($events) . ' events');                

        } catch (Throwable $e) {
            Log::error("Failed to scrape {$this->sourceName}: " . $e->getMessage());
        }

        return $events;
    }
}

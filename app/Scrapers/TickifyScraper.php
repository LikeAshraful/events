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
            $response = $client->get('events/');
            $html = $response->getBody()->getContents();
            $crawler = new Crawler($html);
            logger($html);
            $crawler->filter('.isotope-item')->each(function (Crawler $node) use (&$events) {
                try {

                    $title = $node->filter('.item_title')->count()
                        ? trim($node->filter('.item_title h3')->text())
                        : null;

                    $url = $node->filter('a.strip_info')->count()
                        ? $node->filter('a.strip_info')->attr('href')
                        : $node->filter('a')->attr('href');
                    if ($url && !Str::startsWith($url, 'http')) {
                        $url = rtrim($this->baseUrl, '/') . '/' . ltrim($url, '/');
                    }

                    
                    $dateText = $node->filter('.fw-normal')->count()
                        ? trim($node->filter('.fw-normal')->text())
                        : null;
                    $startDatetime = null;
                    if ($dateText) {
                        try {
                            $startDatetime = Carbon::parse($dateText)->toDateTimeString();
                        } catch (Throwable $t) {
                            Log::warning("Could not parse date '{$dateText}' for Tickify");
                        }
                    }

                    $venue = $node->filter('.event-location')->count()
                        ? trim($node->filter('.event-location')->text())
                        : null;

                                        $banner = $node->filter('.strip figure img')->count()
                        ? ($node->filter('.strip figure img')->attr('data-src') ?? $node->filter('.strip figure img')->attr('src'))
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
                    Log::error('Error parsing Tickify event node: ' . $e->getMessage());
                }
            });

            Log::info('TickifyScraper extracted ' . count($events) . ' events');                

        } catch (Throwable $e) {
            Log::error("Failed to scrape {$this->sourceName}: " . $e->getMessage());
        }

        return $events;
    }
}

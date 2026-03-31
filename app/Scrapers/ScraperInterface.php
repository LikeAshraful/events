<?php

namespace App\Scrapers;

interface ScraperInterface
{
    /**
     * Scrape events from the source.
     *
     * @return array Array of event data arrays.
     */
    public function scrape(): array;
}

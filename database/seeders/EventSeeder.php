<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Tech Innovators Conference 2026',
                'slug' => 'tech-innovators-conference-2026',
                'description' => 'A premier tech conference showcasing the latest in AI, cloud engineering, and web technologies.',
                'city' => 'new-york',
                'venue' => 'Jacob K. Javits Convention Center',
                'start_datetime' => now()->addDays(10)->setTime(9, 0),
                'end_datetime' => now()->addDays(12)->setTime(17, 0),
                'banner' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'external_url' => 'https://example.com/tech-conference',
                'status' => 'published',
                'featured' => true,
                'clicks' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Central Park Summer Festival',
                'slug' => 'central-park-summer-festival',
                'description' => 'Enjoy an open-air festival featuring local bands, food trucks, and family activities in Central Park.',
                'city' => 'new-york',
                'venue' => 'Central Park, Great Lawn',
                'start_datetime' => now()->addDays(5)->setTime(11, 0),
                'end_datetime' => now()->addDays(5)->setTime(22, 0),
                'banner' => 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'external_url' => 'https://example.com/summer-fest',
                'status' => 'published',
                'featured' => true,
                'clicks' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Startup Founders Meetup',
                'slug' => 'startup-founders-meetup-sf',
                'description' => 'Connect, network, and pitch ideas to top angel investors and venture capitalists in the Bay Area.',
                'city' => 'san-francisco',
                'venue' => 'Moscone Center',
                'start_datetime' => now()->addDays(20)->setTime(18, 0),
                'end_datetime' => now()->addDays(20)->setTime(21, 0),
                'banner' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'external_url' => 'https://example.com/sf-meetup',
                'status' => 'published',
                'featured' => false,
                'clicks' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'London Developer Days',
                'slug' => 'london-developer-days',
                'description' => 'A three-day immersive experience for modern web and mobile developers in the heart of London.',
                'city' => 'london',
                'venue' => 'ExCeL London',
                'start_datetime' => now()->addDays(15)->setTime(9, 30),
                'end_datetime' => now()->addDays(17)->setTime(18, 0),
                'banner' => 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'external_url' => 'https://example.com/london-dev',
                'status' => 'published',
                'featured' => false,
                'clicks' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($events as $eventData) {
            \App\Models\Event::updateOrCreate(
                ['slug' => $eventData['slug']],
                $eventData
            );
        }
    }
}

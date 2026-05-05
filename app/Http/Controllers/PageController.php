<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display the About Us page.
     */
    public function about(): Response
    {
        return Inertia::render('About');
    }

    /**
     * Display the Contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    /**
     * Display the Help Center page.
     */
    public function help(): Response
    {
        return Inertia::render('Help');
    }

    /**
     * Display the Privacy Policy page.
     */
    public function privacy(): Response
    {
        return Inertia::render('Privacy');
    }

    /**
     * Display the Terms of Service page.
     */
    public function terms(): Response
    {
        return Inertia::render('Terms');
    }

    /**
     * Display the FAQ page.
     */
    public function faq(): Response
    {
        return Inertia::render('FAQ');
    }

    /**
     * Display the Create Event page.
     */
    public function createEvent(): Response
    {
        return Inertia::render('CreateEvent');
    }
}
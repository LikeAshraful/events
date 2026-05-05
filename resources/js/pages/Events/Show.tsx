import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ event }: any) {
    const startDate = new Date(event.start_datetime);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = startDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = startDate.toLocaleTimeString('en-US', timeOptions);

    const bannerUrl = event.banner 
        ? `/storage/${event.banner}` 
        : `https://via.placeholder.com/1200x600?text=${encodeURIComponent(event.title)}`;

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-20">
            <Head title={`${event.title} - EventPlatform`} />

            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-4 sm:px-6 lg:px-8 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-black text-indigo-600 tracking-tight">
                        Event<span className="text-slate-900">Platform</span>
                    </Link>
                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                        &larr; Back to Events
                    </Link>
                </div>
            </header>

            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 bg-slate-200 relative">
                <img src={bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            {/* Content Container */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6 md:p-10">
                    
                    {/* Event Meta */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div>
                            <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                                {formattedDate} at {formattedTime}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                                {event.title}
                            </h1>
                            <p className="text-lg text-slate-600 font-medium">
                                {event.venue}, {event.city}
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="py-6 border-y border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <div className="text-slate-500 text-sm">
                            <span className="font-semibold text-slate-900">Organized externally.</span>
                            <br />Book tickets directly on their platform.
                        </div>
                        <a
                            href={`/event/${event.id}/go`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-200"
                        >
                            Book Tickets Now
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>

                    {/* Description */}
                    <div className="prose prose-slate max-w-none prose-indigo">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">About this event</h2>
                        {event.description ? (
                            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                                {event.description}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">No description provided for this event.</p>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

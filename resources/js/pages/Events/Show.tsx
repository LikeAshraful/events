import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ event, pastEvents }: any) {
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
            <Head title={`${event.title} - InsiderBD`} />

            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-black text-indigo-600 tracking-tight">
                            Insider<span className="text-slate-900">BD</span>
                        </Link>
                    </div>
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Event Content */}
                    <div className="lg:col-span-8">
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
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Past Events Sidebar Section */}
                        {pastEvents && pastEvents.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Past Events
                                </h3>
                                <div className="space-y-6">
                                    {pastEvents.map((pastEvent: any) => (
                                        <Link 
                                            key={pastEvent.id} 
                                            href={`/event/${pastEvent.slug}`}
                                            className="group block flex items-start gap-4"
                                        >
                                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-200">
                                                <img 
                                                    src={pastEvent.banner ? `/storage/${pastEvent.banner}` : `https://via.placeholder.com/200?text=${encodeURIComponent(pastEvent.title)}`} 
                                                    alt={pastEvent.title} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                    {pastEvent.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {new Date(pastEvent.start_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <Link href="/" className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors flex items-center gap-1">
                                        View all events
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        )}
                        
                        {/* Event Tags/Info Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-4">Event Location</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-indigo-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">{event.venue}</p>
                                        <p className="text-indigo-100 text-sm">{event.city}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

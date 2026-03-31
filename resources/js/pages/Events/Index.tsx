import React from 'react';
import { Head, router } from '@inertiajs/react';
import EventCard from '../../components/EventCard';

export default function Index({ city, events, availableCities = [] }: any) {
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;
        if (selectedCity) {
            router.get(route('events.city', selectedCity.toLowerCase()));
        } else {
            router.get(route('home'));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title={city ? `Events in ${city}` : 'Upcoming Events'} />

            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-black text-indigo-600 tracking-tight">
                            Event<span className="text-slate-900">Platform</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <select 
                            value={city || ''} 
                            onChange={handleCityChange}
                            className="block w-full sm:w-56 pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                            aria-label="Select a city"
                        >
                            <option value="">All Cities</option>
                            {availableCities.map((c: string) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        {city ? (
                            <>Discover Events in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{city}</span></>
                        ) : (
                            <>Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Upcoming Events</span></>
                        )}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore the best upcoming events, concerts, and meetups happening in your city. Book directly via the organizers.
                    </p>
                </div>

                {events.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No upcoming events</h3>
                        <p className="text-slate-500">Check back later or explore other cities.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event: any) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

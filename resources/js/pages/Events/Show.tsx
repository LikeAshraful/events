import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ event, pastEvents }: any) {
    const startDate = new Date(event.start_datetime);

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = startDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = startDate.toLocaleTimeString('en-US', timeOptions);

    const resolveBanner = (banner: any, placeholder: string) => {
        if (!banner) return placeholder;

        if (
            typeof banner === 'string' &&
            (banner.startsWith('http://') ||
                banner.startsWith('https://') ||
                banner.startsWith('//'))
        ) {
            return banner;
        }

        return `/storage/${banner}`;
    };

    // Main event banner
    const bannerUrl = resolveBanner(
        event.banner,
        `https://via.placeholder.com/1200x600?text=${encodeURIComponent(event.title)}`
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-20">
            <Head title={`${event.title} - InsiderBD`} />

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="text-xl font-black text-indigo-600">
                        Insider<span className="text-slate-900">BD</span>
                    </Link>

                    <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600">
                        ← Back to Events
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <div className="w-full h-64 md:h-96 bg-slate-200 relative">
                <img
                    src={bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">

                            <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-3">
                                {formattedDate} at {formattedTime}
                            </span>

                            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                                {event.title}
                            </h1>

                            <p className="text-lg text-slate-600 mb-6">
                                {event.venue}, {event.city}
                            </p>

                            <div className="py-6 border-y mb-8 flex justify-between items-center">
                                <div className="text-sm text-slate-500">
                                    Organized externally. <br />
                                    Book tickets directly.
                                </div>

                                <a
                                    href={`/event/${event.id}/go`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
                                >
                                    Book Now
                                </a>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">About</h2>
                                {event.description || (
                                    <p className="text-slate-500">No description</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Location */}
                        <div className="bg-indigo-600 text-white rounded-2xl p-6">
                            <h3 className="font-bold mb-3">Location</h3>
                            <p>{event.venue}</p>
                            <p className="text-sm">{event.city}</p>
                        </div>

                        {/* Past Events */}
                        {pastEvents && pastEvents.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold mb-6">Past Events</h3>

                                <div className="space-y-6">
                                    {pastEvents.map((pastEvent: any) => {
                                        const pastBannerUrl = resolveBanner(
                                            pastEvent.banner,
                                            `https://via.placeholder.com/200?text=${encodeURIComponent(pastEvent.title)}`
                                        );

                                        return (
                                            <Link
                                                key={pastEvent.id}
                                                href={`/event/${pastEvent.slug}`}
                                                className="flex gap-4"
                                            >
                                                <div className="w-20 h-20 overflow-hidden rounded-lg bg-slate-200">
                                                    <img
                                                        src={pastBannerUrl}
                                                        alt={pastEvent.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-bold">
                                                        {pastEvent.title}
                                                    </h4>

                                                    <p className="text-xs text-slate-500">
                                                        {new Date(
                                                            pastEvent.start_datetime
                                                        ).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
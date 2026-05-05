import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function EventCard({ event }: any) {
    // Format dates
    const startDate = new Date(event.start_datetime);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = startDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = startDate.toLocaleTimeString('en-US', timeOptions);

    const bannerUrl = event.banner 
    ? (event.banner.startsWith('http') ? event.banner : `/storage/${event.banner}`)
    : `https://via.placeholder.com/600x400?text=${encodeURIComponent(event.title)}`;

    return (
        <div className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1">
            <Link href={`/event/${event.slug}`} className="relative h-48 w-full overflow-hidden bg-slate-100 block">
                <img
                    src={bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-indigo-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md">
                        {formattedDate}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-sm font-medium text-slate-500">
                        {event.venue} &bull; {formattedTime}
                    </span>
                </div>
                <Link href={`/event/${event.slug}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {event.title}
                    </h3>
                </Link>
                
                {event.description && (
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                        {event.description}
                    </p>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    <Link
                        href={`/event/${event.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-lg hover:bg-slate-200 transition-colors duration-200"
                    >
                        Details
                    </Link>
                    <a
                        href={`/event/${event.id}/go`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 bg-slate-900 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors duration-200 focus:ring-4 focus:ring-indigo-100"
                    >
                        Book
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

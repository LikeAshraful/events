import React, { FormEvent, useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events Management',
        href: '/admin/events',
    },
];

export default function Index({ events, filters }: any) {
    const { flash } = usePage().props as any;

    const [search, setSearch] = useState(filters?.search || '');
    const [startDate, setStartDate] = useState(filters?.start_date || '');
    const [endDate, setEndDate] = useState(filters?.end_date || '');

    const applyFilters = (e: FormEvent) => {
        e.preventDefault();
        router.get('/admin/events', {
            search,
            start_date: startDate,
            end_date: endDate,
        }, { preserveState: true, replace: true });
    };

    const clearFilters = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        router.get('/admin/events');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Events" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Events Management</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage all currently listed public events.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href={route('admin.events.create')}
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                        >
                            <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add New Event
                        </Link>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-slate-900/5 mb-6">
                    <form onSubmit={applyFilters} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search by Title</label>
                            <input
                                type="text"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="E.g., Tech Conference..."
                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <label htmlFor="start_date" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                id="start_date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                        <div className="w-full sm:w-48">
                            <label htmlFor="end_date" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input
                                type="date"
                                id="end_date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notifications */}
                {flash?.success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Title</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">City</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Date</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Status</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Clicks</th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {events.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">No events found. Create one.</td>
                                    </tr>
                                ) : (
                                    events.data.map((event: any) => (
                                        <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                                                {event.title}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{event.city}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                                                {new Date(event.start_datetime).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                    event.status === 'published' 
                                                        ? 'bg-green-50 text-green-700 ring-green-600/20' 
                                                        : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                                                }`}>
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 font-mono">
                                                {event.clicks}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link href={route('admin.events.edit', event.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Edit
                                                </Link>
                                                <Link 
                                                    href={route('admin.events.destroy', event.id)} 
                                                    method="delete" 
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Pagination Controls */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
                    <div>
                        Showing <span className="font-medium">{events.from || 0}</span> to <span className="font-medium">{events.to || 0}</span> of <span className="font-medium">{events.total || 0}</span> results.
                    </div>
                    
                    {events.links && events.links.length > 3 && (
                        <div className="flex flex-wrap gap-1">
                            {events.links.map((link: any, index: number) => (
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveState
                                        className={`px-3 py-1 rounded border min-w-[32px] text-center ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded border min-w-[32px] text-center bg-slate-50 text-slate-400 border-slate-300 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

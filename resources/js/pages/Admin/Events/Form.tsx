import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function Form({ event = null }) {
    const isEdit = !!event;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Events Management',
            href: '/admin/events',
        },
        {
            title: isEdit ? 'Edit Event' : 'Create Event',
            href: isEdit ? route('admin.events.edit', event.id) : route('admin.events.create'),
        },
    ];

    // Format dates for input[type="datetime-local"]
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toISOString().slice(0, 16);
    };

    const { data, setData, post, put, processing, errors } = useForm({
        ...(isEdit ? { _method: 'put' } : {}),
        title: event?.title || '',
        description: event?.description || '',
        city: event?.city || '',
        venue: event?.venue || '',
        start_datetime: formatDateForInput(event?.start_datetime) || '',
        end_datetime: formatDateForInput(event?.end_datetime) || '',
        status: event?.status || 'draft',
        featured: event?.featured || false,
        external_url: event?.external_url || '',
        banner: null, // Always handle file separately 
    });

    const [previewUrl, setPreviewUrl] = useState(event?.banner ? `/storage/${event.banner}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use POST for files if method spoofing needed, but standard Inertia can handle it if we use multipart/form-data
        if (isEdit) {
            // Laravel needs _method for PUT when sending FormData, which is now in data
            post(route('admin.events.update', event.id), {
                preserveScroll: true,
            });
        } else {
            post(route('admin.events.store'), {
                preserveScroll: true,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('banner', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(event?.banner ? `/storage/${event.banner}` : null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Event' : 'Create Event'} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 selection:bg-indigo-500 selection:text-white">
                <div className="mb-8">
                    <Link href={route('admin.events.index')} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                        &larr; Back to Events
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">
                            {isEdit ? 'Edit Event Listing' : 'Create New Event'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Title */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Event Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
                                        placeholder="e.g. Summer Music Festival"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* External URL */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">External URL (https://)</label>
                                    <input
                                        type="url"
                                        value={data.external_url}
                                        onChange={e => setData('external_url', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="https://example.com/book"
                                    />
                                    {errors.external_url && <p className="mt-1 text-sm text-red-600">{errors.external_url}</p>}
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        placeholder="e.g. New York"
                                    />
                                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                </div>

                                {/* Venue */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Venue</label>
                                    <input
                                        type="text"
                                        value={data.venue}
                                        onChange={e => setData('venue', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        placeholder="e.g. Madison Square Garden"
                                    />
                                    {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
                                </div>

                                {/* Dates */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={data.start_datetime}
                                        onChange={e => setData('start_datetime', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                    {errors.start_datetime && <p className="mt-1 text-sm text-red-600">{errors.start_datetime}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={data.end_datetime}
                                        onChange={e => setData('end_datetime', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                    {errors.end_datetime && <p className="mt-1 text-sm text-red-600">{errors.end_datetime}</p>}
                                </div>

                                {/* Status */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>

                                {/* Featured */}
                                <div className="sm:col-span-2">
                                    <div className="flex items-center">
                                        <input
                                            id="featured"
                                            type="checkbox"
                                            checked={data.featured}
                                            onChange={e => setData('featured', e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-slate-300 rounded"
                                        />
                                        <label htmlFor="featured" className="ml-3 block text-sm font-medium text-slate-700">
                                            <span className="flex items-center">
                                                Featured Event
                                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                                    ⭐ Premium
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Featured events appear prominently on the homepage and get special highlighting.
                                    </p>
                                    {errors.featured && <p className="mt-1 text-sm text-red-600">{errors.featured}</p>}
                                </div>

                                {/* File Upload */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Banner Image</label>
                                    <div className="mt-2 flex items-center gap-6">
                                        {previewUrl && (
                                            <div className="w-32 h-20 relative overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                                        />
                                    </div>
                                    {errors.banner && <p className="mt-1 text-sm text-red-600">{errors.banner}</p>}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-x-6">
                                <Link
                                    href={route('admin.events.index')}
                                    className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-600 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {processing ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

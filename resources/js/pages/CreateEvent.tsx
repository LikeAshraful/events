import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function CreateEvent() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        venue: '',
        address: '',
        city: '',
        ticketPrice: '',
        maxAttendees: '',
        contactEmail: '',
        contactPhone: '',
        website: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const categories = [
        'Music', 'Sports', 'Technology', 'Business', 'Arts & Culture',
        'Food & Drink', 'Health & Wellness', 'Education', 'Networking',
        'Community', 'Entertainment', 'Other'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for submitting your event! Our team will review it and get back to you within 24-48 hours.');
            setFormData({
                title: '', description: '', category: '', startDate: '', startTime: '',
                endDate: '', endTime: '', venue: '', address: '', city: '',
                ticketPrice: '', maxAttendees: '', contactEmail: '', contactPhone: '', website: ''
            });
            setCurrentStep(1);
            setIsSubmitting(false);
        }, 2000);
    };

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Create Event - InsiderBD" />

            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-black text-indigo-600 tracking-tight">
                            Insider<span className="text-slate-900">BD</span>
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">Home</a>
                        <a href="/events" className="text-slate-600 hover:text-indigo-600 transition-colors">Events</a>
                        <a href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">About</a>
                        <a href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Event</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Share your amazing event with thousands of potential attendees on InsiderBD
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-200 text-slate-600'
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-2 space-x-16 text-sm text-slate-600">
                        <span>Event Details</span>
                        <span>Venue & Tickets</span>
                        <span>Contact Info</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Event Details</h2>

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your event title"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Describe your event in detail..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-2">
                                        Start Time *
                                    </label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-2">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Venue & Tickets</h2>

                            <div>
                                <label htmlFor="venue" className="block text-sm font-medium text-slate-700 mb-2">
                                    Venue Name *
                                </label>
                                <input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Venue or location name"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                                    Address *
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Full address"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="City name"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-slate-700 mb-2">
                                        Ticket Price (BDT)
                                    </label>
                                    <input
                                        type="number"
                                        id="ticketPrice"
                                        name="ticketPrice"
                                        value={formData.ticketPrice}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="maxAttendees" className="block text-sm font-medium text-slate-700 mb-2">
                                        Maximum Attendees
                                    </label>
                                    <input
                                        type="number"
                                        id="maxAttendees"
                                        name="maxAttendees"
                                        value={formData.maxAttendees}
                                        onChange={handleChange}
                                        min="1"
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Unlimited if empty"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700 mb-2">
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactPhone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="+880 123 456 7890"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-2">
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-900">What happens next?</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            After submission, our team will review your event within 24-48 hours.
                                            We'll contact you if we need any additional information or clarifications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Previous
                            </button>
                        )}

                        <div className="ml-auto">
                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Event'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {/* Tips Section */}
                <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Tips for a Successful Event</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">📸 High-quality images</h4>
                            <p className="text-sm text-slate-600">Use clear, professional photos that showcase your event</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">✍️ Detailed description</h4>
                            <p className="text-sm text-slate-600">Include all important details, schedule, and what attendees can expect</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">🎯 Clear pricing</h4>
                            <p className="text-sm text-slate-600">Be transparent about ticket costs and what's included</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">📍 Accurate location</h4>
                            <p className="text-sm text-slate-600">Provide complete address and directions for easy access</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-indigo-400">InsiderBD</h3>
                            <p className="text-slate-300 mb-4">
                                Your gateway to the best events, concerts, and experiences in Bangladesh and beyond.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h4>
                            <ul className="space-y-2 text-slate-300">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/events" className="hover:text-white transition-colors">All Events</a></li>
                                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-indigo-400">Support</h4>
                            <ul className="space-y-2 text-slate-300">
                                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-700 pt-8 text-center">
                        <p className="text-slate-400">
                            © 2026 InsiderBD. All rights reserved. Made with ❤️ for event lovers everywhere.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Help() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const faqs = [
        {
            question: "How do I create an event on InsiderBD?",
            answer: "To create an event, click on 'Create Event' in the navigation menu. Fill out the event details including title, description, date, time, location, and ticket information. Once submitted, your event will be reviewed and published."
        },
        {
            question: "How do I find events in my city?",
            answer: "Use the city dropdown in the top navigation or visit the events page and select your city from the filter options. You can also search for specific events using the search bar."
        },
        {
            question: "How do I purchase tickets for an event?",
            answer: "Click on any event card to view details, then click the 'Book Now' or 'Get Tickets' button. Follow the checkout process to complete your purchase. You'll receive a confirmation email with your tickets."
        },
        {
            question: "Can I cancel or refund my ticket purchase?",
            answer: "Refund policies vary by event organizer. Check the event details page for specific refund information. If you need to request a refund, contact the event organizer directly through the platform."
        },
        {
            question: "How do I contact an event organizer?",
            answer: "Visit the event details page and look for the organizer's contact information. You can send them a message through our platform or use the provided contact details."
        },
        {
            question: "What types of events can I find on InsiderBD?",
            answer: "We host all types of events including concerts, conferences, workshops, meetups, sports events, festivals, and more. From small local gatherings to large-scale productions."
        },
        {
            question: "How do I update my event information?",
            answer: "If you're an event organizer, log in to your dashboard and navigate to 'My Events'. Click on the event you want to edit and make your changes. Some changes may require re-approval."
        },
        {
            question: "Is InsiderBD free to use?",
            answer: "Yes! Discovering and attending events is completely free. Event organizers may have optional premium features available for enhanced event promotion."
        }
    ];

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFAQ = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Help Center - InsiderBD" />

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
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Center</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Find answers to common questions and get the help you need
                    </p>
                </div>

                {/* Search */}
                <div className="mb-12">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for help..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4 mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
                    {filteredFAQs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                            >
                                <span className="font-medium text-slate-900">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {expandedFAQ === index && (
                                <div className="px-6 pb-4">
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Still Need Help?</h2>
                    <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help.
                        Get in touch with us and we'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/faq"
                            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            View Full FAQ
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">User Guide</h3>
                        <p className="text-sm text-slate-600 mb-4">Step-by-step guides for using InsiderBD</p>
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Learn More →</a>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">Organizer Resources</h3>
                        <p className="text-sm text-slate-600 mb-4">Tips and tools for event organizers</p>
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Learn More →</a>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">Troubleshooting</h3>
                        <p className="text-sm text-slate-600 mb-4">Common issues and their solutions</p>
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Learn More →</a>
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
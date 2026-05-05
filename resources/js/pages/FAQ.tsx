import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function FAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const faqs = [
        {
            question: "What is InsiderBD?",
            answer: "InsiderBD is an online platform that connects event organizers with attendees across Bangladesh and beyond. We help people discover amazing events, concerts, meetups, and experiences in their cities while providing organizers with tools to create and manage successful events."
        },
        {
            question: "How do I create an event on InsiderBD?",
            answer: "To create an event, click on 'Create Event' in the navigation menu or footer. Fill out the event details including title, description, date, time, location, ticket pricing, and capacity. Once submitted, your event will be reviewed by our team and published if it meets our guidelines."
        },
        {
            question: "How do I find events in my city?",
            answer: "Use the city dropdown in the top navigation or visit the events page and select your city from the filter options. You can also search for specific events using the search bar with keywords like event type, artist name, or venue."
        },
        {
            question: "How do I purchase tickets for an event?",
            answer: "Click on any event card to view details, then click the 'Book Now' or 'Get Tickets' button. Select your ticket type and quantity, then complete the secure checkout process. You'll receive a confirmation email with your tickets and event details."
        },
        {
            question: "Can I cancel or get a refund for my ticket purchase?",
            answer: "Refund policies vary by event organizer. Check the event details page for specific refund information before purchasing. If you need to request a refund, contact the event organizer directly through our platform messaging system. InsiderBD processes refunds according to the organizer's stated policy."
        },
        {
            question: "How do I contact an event organizer?",
            answer: "Visit the event details page and look for the 'Contact Organizer' button or messaging option. You can send them a message through our platform about questions, special accommodations, or other concerns related to their event."
        },
        {
            question: "What types of events can I find on InsiderBD?",
            answer: "We host all types of events including music concerts, corporate conferences, workshops, seminars, sports events, festivals, art exhibitions, theater performances, community meetups, networking events, and much more. From small local gatherings to large-scale productions."
        },
        {
            question: "How do I update my event information?",
            answer: "If you're an event organizer, log in to your dashboard and navigate to 'My Events'. Click on the event you want to edit and make your changes. Some changes may require re-approval by our team. For significant changes like date or venue, please contact our support team."
        },
        {
            question: "Is InsiderBD free to use?",
            answer: "Yes! Discovering and attending events is completely free for users. Event organizers can list basic events for free, with optional premium features available for enhanced event promotion, advanced analytics, and marketing tools."
        },
        {
            question: "How do I create an organizer account?",
            answer: "Click on 'Sign Up' and select 'Event Organizer' during registration. You'll need to provide basic information about yourself or your organization. Once verified, you'll have access to event creation tools and organizer dashboard features."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards (Visa, MasterCard, American Express), debit cards, and popular digital payment methods available in Bangladesh including bKash, Nagad, and Rocket. All payments are processed securely through our certified payment partners."
        },
        {
            question: "How do I get my event featured on the homepage?",
            answer: "Events can be featured through our premium promotion packages. Contact our sales team for information about featured listings, banner placements, and targeted marketing campaigns that increase visibility for your event."
        },
        {
            question: "Can I sell merchandise or additional items with my event?",
            answer: "Yes, organizers can set up merchandise sales and additional ticket packages through their event dashboard. We support various product types including physical merchandise, digital downloads, and add-on experiences."
        },
        {
            question: "What should I do if I forget my password?",
            answer: "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link. Follow the instructions in the email to create a new password. Make sure to check your spam folder if you don't see the email."
        },
        {
            question: "How do I report inappropriate content or behavior?",
            answer: "Use the 'Report' button available on event pages, user profiles, or comments. You can also contact our support team directly. We take reports seriously and investigate all complaints promptly to maintain a safe and positive community."
        },
        {
            question: "Can I transfer my tickets to someone else?",
            answer: "Ticket transfer policies depend on the event organizer. Some events allow transfers through our platform, while others may have restrictions. Check the event details or contact the organizer to inquire about transfer options."
        },
        {
            question: "Do you offer group discounts?",
            answer: "Many organizers offer group discounts for larger purchases. Look for 'Group Pricing' options on event pages or contact the organizer directly to inquire about bulk ticket discounts for groups, corporate outings, or team events."
        },
        {
            question: "How far in advance should I book tickets?",
            answer: "This varies by event type and popularity. Popular concerts and festivals often sell out quickly, so we recommend booking as soon as tickets go on sale. For less popular events, tickets may be available closer to the event date."
        },
        {
            question: "What if an event is cancelled or postponed?",
            answer: "If an event is cancelled, you'll receive a full refund automatically. For postponements, you can choose to keep your tickets for the new date or request a refund. Event organizers are responsible for communicating changes and our team monitors all updates."
        },
        {
            question: "Can I get event recommendations based on my interests?",
            answer: "Yes! Create a profile and let us know your interests, favorite event types, and preferred locations. We'll send you personalized recommendations via email and show relevant events when you browse our platform."
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
            <Head title="Frequently Asked Questions - InsiderBD" />

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
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Find answers to the most common questions about InsiderBD
                    </p>
                </div>

                {/* Search */}
                <div className="mb-12">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search FAQs..."
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

                {/* FAQ List */}
                <div className="space-y-4 mb-16">
                    {filteredFAQs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg border border-slate-200 shadow-sm">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                            >
                                <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-slate-500 transform transition-transform flex-shrink-0 ${expandedFAQ === index ? 'rotate-180' : ''}`}
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

                {/* Still Need Help */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center border border-indigo-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Still Have Questions?</h2>
                    <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                        Can't find the answer you're looking for? Our friendly support team is here to help.
                        Get in touch and we'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/help"
                            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            Visit Help Center
                        </a>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">20+</div>
                        <div className="text-slate-600">Common Questions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-slate-600">Support Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600 mb-2">5min</div>
                        <div className="text-slate-600">Average Response</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                        <div className="text-slate-600">Satisfaction Rate</div>
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
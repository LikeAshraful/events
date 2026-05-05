import React from 'react';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Terms of Service - InsiderBD" />

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
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Service</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using InsiderBD
                    </p>
                    <p className="text-sm text-slate-500 mt-4">Last updated: March 31, 2026</p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>By accessing and using InsiderBD, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>InsiderBD is an online platform that connects event organizers with attendees. Our services include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Event discovery and browsing</li>
                                    <li>Ticket purchasing and management</li>
                                    <li>Event creation and management tools</li>
                                    <li>Communication tools between organizers and attendees</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>To use certain features of our service, you must register for an account. You agree to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Provide accurate and complete information</li>
                                    <li>Maintain the security of your password</li>
                                    <li>Accept responsibility for all activities under your account</li>
                                    <li>Notify us immediately of any unauthorized use</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Conduct</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>You agree not to use the service to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Infringe on intellectual property rights</li>
                                    <li>Post false, misleading, or harmful content</li>
                                    <li>Harass, abuse, or harm other users</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Distribute malware or engage in fraudulent activities</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Event Listings and Tickets</h2>
                            <div className="space-y-4 text-slate-600">
                                <h3 className="text-lg font-semibold text-slate-900">For Event Organizers:</h3>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>You are responsible for the accuracy of event information</li>
                                    <li>You must comply with all applicable laws and regulations</li>
                                    <li>You agree to honor all ticket sales and provide advertised services</li>
                                    <li>You are responsible for customer service related to your events</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-slate-900">For Attendees:</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Ticket purchases are final unless otherwise specified</li>
                                    <li>You agree to the event organizer's terms and conditions</li>
                                    <li>You are responsible for providing accurate information for tickets</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Payment Terms</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>All payments are processed securely through our payment partners. By making a payment:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You authorize us to charge your payment method</li>
                                    <li>You agree to pay all applicable fees and charges</li>
                                    <li>Refunds are subject to the event organizer's refund policy</li>
                                    <li>You are responsible for any additional bank or payment processing fees</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>The service and its original content, features, and functionality are owned by InsiderBD and are protected by copyright, trademark, and other intellectual property laws.</p>
                                <p>You may not reproduce, distribute, or create derivative works without our express written permission.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Privacy</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Disclaimers</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Merchantability and fitness for a particular purpose</li>
                                    <li>Accuracy, reliability, and completeness of information</li>
                                    <li>Non-infringement of third-party rights</li>
                                    <li>Freedom from viruses or other harmful components</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Limitation of Liability</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>In no event shall InsiderBD be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the service.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Termination</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We may terminate or suspend your account and access to the service immediately, without prior notice, for any reason, including breach of these terms.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Governing Law</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>These terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to Terms</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We reserve the right to modify these terms at any time. We will notify users of material changes via email or through our platform.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Information</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>If you have any questions about these Terms of Service, please contact us:</p>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <p><strong>Email:</strong> legal@insiderbd.com</p>
                                    <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </section>
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
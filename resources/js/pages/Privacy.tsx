import React from 'react';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Privacy Policy - InsiderBD" />

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
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Policy</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        How we collect, use, and protect your personal information
                    </p>
                    <p className="text-sm text-slate-500 mt-4">Last updated: March 31, 2026</p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We collect information you provide directly to us, such as when you:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Create an account or profile</li>
                                    <li>Purchase tickets for events</li>
                                    <li>Create or manage events</li>
                                    <li>Contact us for support</li>
                                    <li>Subscribe to our newsletter</li>
                                </ul>
                                <p>This may include your name, email address, phone number, payment information, and event preferences.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Provide and maintain our services</li>
                                    <li>Process ticket purchases and event registrations</li>
                                    <li>Send you important updates about your events</li>
                                    <li>Communicate with you about our services</li>
                                    <li>Improve our platform and develop new features</li>
                                    <li>Ensure security and prevent fraud</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information Sharing</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>With event organizers for event management purposes</li>
                                    <li>With service providers who help us operate our platform</li>
                                    <li>When required by law or to protect our rights</li>
                                    <li>With your explicit consent</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Encryption of sensitive data</li>
                                    <li>Secure server infrastructure</li>
                                    <li>Regular security audits</li>
                                    <li>Limited access to personal information</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies and Tracking</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We use cookies and similar technologies to enhance your experience on our platform. This includes:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Remembering your preferences and settings</li>
                                    <li>Analyzing site usage and performance</li>
                                    <li>Providing personalized content and recommendations</li>
                                </ul>
                                <p>You can control cookie settings through your browser preferences.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access and update your personal information</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt out of marketing communications</li>
                                    <li>Data portability</li>
                                    <li>Lodge a complaint with supervisory authorities</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. International Data Transfers</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <p><strong>Email:</strong> privacy@insiderbd.com</p>
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
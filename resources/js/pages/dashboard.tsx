import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CalendarDays, CheckCircle2, MousePointerClick, Calendar, ArrowRight, Activity, MapPin } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Insights & Analytics',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, upcoming_events }) {
    const statCards = [
        {
            title: 'Total Organized Events',
            value: stats.total_events,
            icon: CalendarDays,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100/50',
            trend: '+12% from last month'
        },
        {
            title: 'Active Published',
            value: stats.published_events,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100/50',
            trend: '+5% from last month'
        },
        {
            title: 'Total "Book Now" Clicks',
            value: stats.total_clicks.toLocaleString(),
            icon: MousePointerClick,
            color: 'text-amber-600',
            bgColor: 'bg-amber-100/50',
            trend: '+24% from last month'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4 md:p-8 bg-slate-50">
                
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Activity className="w-8 h-8 text-indigo-600" />
                        Platform Overview
                    </h1>
                    <p className="mt-2 text-slate-500">Monitor your overall event metrics and performance here.</p>
                </div>

                {/* Animated Stat Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {statCards.map((stat, index) => (
                        <div key={index} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] group">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <div className={`p-3 rounded-full ${stat.bgColor} transition-transform group-hover:scale-110`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-baseline gap-2">
                                <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">{stat.value}</h3>
                            </div>
                            <div className="mt-4 text-xs font-medium text-slate-400">
                                {stat.trend}
                            </div>
                            {/* Decorative gradient blur */}
                            <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 blur-3xl ${stat.bgColor}`}></div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Events Data Table/List */}
                <div className="mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            Next Upcoming Events
                        </h3>
                        <Link href={route('admin.events.index')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 group">
                            View All Events <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    
                    {upcoming_events.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            No upcoming events on the horizon.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {upcoming_events.map(event => (
                                <div key={event.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex flex-col items-center justify-center text-indigo-600 border border-indigo-100">
                                            <span className="text-xs font-bold uppercase">{new Date(event.start_datetime).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            <span className="text-lg font-black leading-none">{new Date(event.start_datetime).getDate()}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-900 text-lg">{event.title}</h4>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                                                    event.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {event.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" /> {event.venue}, <span className="capitalize">{event.city}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right sm:text-center flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                        <div className="text-sm text-slate-500 font-medium whitespace-nowrap">Clicks Generated</div>
                                        <div className="text-xl font-bold text-slate-900 inline-flex items-center gap-1.5 ml-2 sm:ml-0 mt-1">
                                            <MousePointerClick className="w-4 h-4 text-slate-400" />
                                            {event.clicks}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

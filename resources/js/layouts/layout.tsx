import { Head } from "@inertiajs/react";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head
                title="My App">
                <meta name="description" content="This is the description of my app." />
            </Head>
            <main className="px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </>
    );
}

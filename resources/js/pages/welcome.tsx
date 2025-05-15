import { About } from '@/components/frontend/About';
import { FAQ } from '@/components/frontend/FAQ';
import { Features } from '@/components/frontend/Features';
import { Footer } from '@/components/frontend/Footer';
import { Hero } from '@/components/frontend/Hero';
import { HowItWorks } from '@/components/frontend/HowItWorks';
import { Navbar } from '@/components/frontend/Navbar';
import { ScrollToTop } from '@/components/frontend/ScrollToTop';
import { Search } from '@/components/frontend/Search';
import Layout from '@/layouts/layout';

export default function Welcome() {


    return (
        <>
            <Navbar />
            <Search />
            <About />
            <HowItWorks />
            {/* <Features /> */}
            {/* <Services />
            <Cta />
            <Testimonials />
            <Team />
            <Newsletter /> */}
            <FAQ />
            <Footer />
            <ScrollToTop />



        </>
    );
}

Welcome.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

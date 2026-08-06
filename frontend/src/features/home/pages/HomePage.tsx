import { CtaBanner } from "../components/CtaBanner";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Pricing } from "../components/Pricing";

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <CtaBanner />
            <Footer />
        </div>
    );
};